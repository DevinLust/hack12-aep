from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


# Define the FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this if you want to restrict the origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define a Pydantic model for the request body


class CommentRequest(BaseModel):
    comment: str

# Endpoint to process the form submission


@app.post("/classify")
async def classify_comment(request: CommentRequest):
    comment = request.comment
    # You can define your candidate labels based on your classification task
    candidate_labels = ["high risk", "low risk", "neutral"]

    # use nlp to determine between the candidate labels
    label = 'high risk'

    # Extract the highest scoring label and return it
    return {"label": label}

# Run the server using Uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
