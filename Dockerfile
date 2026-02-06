# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
# We assume the project uses a requirements.txt file for dependencies
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
# Using --no-cache-dir to reduce image size
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application's code to the working directory
COPY . .

# Expose the port the app runs on
# The logs indicate the Uvicorn server is running on port 8001
EXPOSE 8001

# Define the command to run the application
# The logs show a Uvicorn server. We assume the main file is 'main.py'
# and the FastAPI/Starlette app instance is named 'app'.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
