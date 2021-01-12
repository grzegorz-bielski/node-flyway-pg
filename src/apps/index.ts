import { proxyServer } from "./proxyServer";
import { uploadServer } from "./uploadServer";
import { webServer } from "./webServer";

webServer.listen(3000, () => console.log("web server is up"));
proxyServer.listen(3001, () => console.log("proxy server is up"));
uploadServer.listen(3002, () => console.log("upload server is up"));
