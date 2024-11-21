from graphviz import Digraph

# Create a directed graph for the sequence diagram
diagram = Digraph("RealTimeQuizSequenceDiagram", format="png")

# Define lifelines (participants)
diagram.node("Client", "Client", shape="rectangle")
diagram.node("WebSocket", "WebSocket Server", shape="rectangle")
diagram.node("API", "API Server", shape="rectangle")
diagram.node("Auth", "Authentication Service", shape="rectangle")
diagram.node("Database", "Database", shape="rectangle")
diagram.node("Cache", "Cache", shape="rectangle")

# Define messages for the main flow
diagram.edge("Client", "WebSocket", label="Request to join quiz")
diagram.edge("WebSocket", "API", label="Forward quiz join request")
diagram.edge("API", "Auth", label="Authenticate user")

# Define alternative paths for authentication success or failure
with diagram.subgraph() as success:
    success.attr(rankdir='LR')
    success.edge("Auth", "API", label="Authentication success")
    success.edge("API", "Database", label="Store quiz data")
    success.edge("API", "Cache", label="Update leaderboard")
    success.edge("Cache", "WebSocket", label="Leaderboard update")
    success.edge("WebSocket", "Client", label="Real-time leaderboard update")

with diagram.subgraph() as failure:
    failure.attr(rankdir='LR')
    failure.edge("Auth", "API", label="Authentication failed")
    failure.edge("API", "Client", label="Require sign-up")
    failure.edge("Client", "API", label="Submit sign-up info")
    failure.edge("API", "Database", label="Store new user data")
    failure.edge("API", "Auth", label="Authenticate new user")
    failure.edge("Auth", "API", label="Authentication success (new user)")
    failure.edge("API", "Cache", label="Update leaderboard (new user)")
    failure.edge("Cache", "WebSocket", label="Leaderboard update (new user)")
    failure.edge("WebSocket", "Client", label="Real-time leaderboard update (new user)")

# Render the diagram
diagram.render("/Users/admin/Public/public_html/git/coding-challenges/Part_1/RealTimeQuizSequenceDiagram")
