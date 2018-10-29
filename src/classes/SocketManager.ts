import * as client from "socket.io-client";
import * as React from "react";

export class SocketManager {

  public static app: React.Component;
  public static socket: client.Socket;

  public static Init(_app:React.Component): void {
    this.app = _app;
    this.socket = client("http://localhost:3001");

    this.socket.on("init", homeData => {
      this.app.setState({ homeData });
    })
  }
}