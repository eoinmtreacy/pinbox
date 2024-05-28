# ml_pipeline/Dockerfile
FROM continuumio/miniconda3:latest

WORKDIR /app

# Create the Conda environment
RUN conda create -n ml_pipline python=3.9 pip

# Activate the Conda environment and install additional pip packages
SHELL ["conda", "run", "-n", "ml_pipeline", "/bin/bash", "-c"]
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 5000

# Activate the Conda environment and run the application
CMD ["conda", "run", "--no-capture-output", "-n", "ml_pipeline", "python", "app.py"]

