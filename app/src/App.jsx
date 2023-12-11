import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQueryClient, useQuery, useMutation } from "react-query";
import { create } from "zustand";
import axios from "axios";
import './App.scss';

const queryClient = new QueryClient();

const useStore = create((set) => ({
  errorMessage: "Welcome",
  set: (message) => set((state) => ({ errorMessage: message}))
}));

const createPost = async (data2) => {
  return await axios.post("/api/posts", data2);
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  const errorMessage = useStore((state) => state.errorMessage);
  const setErrorMessage = useStore((state) => state.set);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({queryKey: ["posts"], queryFn: async () => { 
    return axios.get("/api/posts").then(res => res.data);
  }});

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts"]});
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    e.target.reset();
    if (formJson.title === "" || formJson.message === "") {
      setErrorMessage("You must enter a Title and Message!");
    } else {
      setErrorMessage("Congrats on your new todo!");
      mutation.mutate(formJson)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <br />
          <h1>My todos</h1>

          <br />

          {!isLoading ? data.rows.length > 0 ? data.rows.map((post, i) => (
            <div key={post.id} data-post-id={post.id} className="todo">
              <h4>{post.title}</h4>
              <p>{post.message}</p>
              <span className="delete">delete</span>
            </div>
          )) : "No rows" : "Loading"}
        </div>
        <div className="col-6">
          <br />
          <h1>Add new todo</h1>
          <p>{errorMessage}</p>

          <br />
          <form method="post" onSubmit={handleSubmit}>
            <label>Title</label>
            <input name="title" placeholder="Enter a title"></input>

            <label>Message</label>
            <input name="message" placeholder="Enter a message"></input>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
