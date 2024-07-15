<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/home01.svelte";
  import Chat01 from "./routes/chat01.svelte";

  export let url = "";
</script>

<Router {url}>
  <div style="padding: 12px;">
    <nav>
      <Link to="/">Home</Link>
      <Link to="/chat/01">Chat</Link>
    </nav>
    <div>
      <Route path="/"><Home /></Route>
      <Route path="/chat/:id" let:params>
        <Chat01 id={params.id} />
      </Route>
    </div>
  </div>
</Router>
