import React, { useState } from "react";
import "./App.css";
import { PostList } from "./features/postList/PostList";
import { PostDetail } from "./features/postDetail/PostDetail";

function App() {
  const [date, setDate] = useState<string | null>(null);
  return (
    <div className="App">
      {date === null ? null : <PostDetail date={date} />}
      <PostList onClickPost={(date) => setDate(date)} />
    </div>
  );
}

export default App;
