# ml_pipeline/Dockerfile
FROM python:3.12-slim

WORKDIR /

# Update default packages
RUN apt-get update

# Get Ubuntu packages
RUN apt-get install -y \
    build-essential \
    curl

# Update new packages
RUN apt-get update

# Get Rust, needed for pip
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y

# Add cargo to path
ENV PATH="/root/.cargo/bin:${PATH}"

# install python requirements
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN cargo --version
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000
CMD ["python", "test.py"]

