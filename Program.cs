using System.Net.Sockets;
using Fleck;

var server = new WebSocketServer("ws://0.0.0.0:8181");

var wsConnections = new List<IWebSocketConnection>();

server.Start(ws =>
{
    ws.OnOpen = () => 
        {
        Console.WriteLine("Open!");
        wsConnections.Add(ws);
    };
    ws.OnClose = () => 
        {
        Console.WriteLine("Close!");
        wsConnections.Remove(ws);
    };
    ws.OnMessage = message => 
        {
            foreach (var websocket in wsConnections)
            {
                websocket.Send(message);
            }
        };
});

WebApplication.CreateBuilder(args);

Console.WriteLine("Server started. Press any key to exit.");
Console.ReadLine();


