import { removePrefix } from "./utils";
import { baseURL } from "@/utils/constants";
import store from "@/store";

const ssl = window.location.protocol === "https:";
const protocol = ssl ? "wss:" : "ws:";

export default function command(url, command, onmessage, onclose) {
  const idToken = localStorage.getItem("id_token");
  url = removePrefix(url);
  url = `${protocol}//${window.location.host}${baseURL}/api/command${url}?auth=${store.state.jwt}&auth_code=${idToken}`;

  let conn = new window.WebSocket(url);
  conn.onopen = () => conn.send(command);
  conn.onmessage = onmessage;
  conn.onclose = onclose;
}
