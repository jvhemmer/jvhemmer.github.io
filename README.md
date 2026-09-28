# Johann V. Hemmer's website

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/jvhemmer/jvhemmer.github.io
cd jvhemmer.github.io
```

### 2. Install dependencies

On Ubuntu or Debian, install Ruby, Bundler, and the native build tools:

```bash
sudo apt update
sudo apt install ruby-full ruby-dev ruby-bundler build-essential zlib1g-dev
```

Install the project's Ruby dependencies locally:

```bash
bundle config set --local path vendor/bundle
bundle install
```

### 3. Start the development server

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4100 --livereload
```

Open [http://127.0.0.1:4100/](http://127.0.0.1:4100/) in a browser. Keep the
terminal running while viewing the site; press `Ctrl+C` to stop the server.
