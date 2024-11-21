from graphviz import Digraph

# Create a directed graph
diagram = Digraph("RealTimeQuizComponentDiagram", format="png")

# Define nodes (components)
diagram.node("Client", "Client (Web/Mobile)", shape="component")
diagram.node("WebSocket", "WebSocket Server", shape="component")
diagram.node("API", "API Server", shape="component")
diagram.node("Database", "Database (PostgreSQL/MySQL)", shape="cylinder")
diagram.node("Cache", "Cache (Redis)", shape="component")
diagram.node("Auth", "Authentication Service", shape="component")

# Define connections (dependencies/interactions)
diagram.edge("Client", "WebSocket", label="Real-time quiz updates")
diagram.edge("Client", "API", label="HTTP requests (join quiz, submit answers)")
diagram.edge("WebSocket", "Cache", label="Publish/Subscribe (Leaderboard updates)")
diagram.edge("API", "Database", label="Persistent storage (Quiz data, Scores)")
diagram.edge("API", "Cache", label="Read/Write temporary data")
diagram.edge("API", "Auth", label="User Authentication")

# Render the diagram
diagram.render("/Users/admin/Public/public_html/git/coding-challenges/Part_1/RealTimeQuizComponentDiagram")
