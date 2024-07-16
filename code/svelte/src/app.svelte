<script lang="ts">
  import "./app.css";
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/home01.svelte";
  import Chat01 from "./routes/chat01.svelte";

  export let url = "";
</script>

<Router {url}>
  <div class="p-4">
    <nav class="flex gap-x-2 pb-2">
      <Link class="text-blue-400 underline" to="/">Home</Link>
      <Link class="text-blue-400 underline" to="/chat/01">Chat</Link>
    </nav>
    <div>
      <Route path="/"><Home></Home></Route>
      <Route path="/chat/:id" let:params>
        <Chat01 id={params.id}></Chat01>
      </Route>
    </div>
  </div>
</Router>
