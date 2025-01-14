FROM ubuntu:24.04

RUN apt-get update  \
    && apt-get install -y ruby-full build-essential zlib1g-dev \
    && gem install sass \
    && gem install sass-embedded --force \
    && gem install jekyll bundler github-pages \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /jekyll

CMD jekyll serve -H $(hostname) --incremental --watch --verbose --force_polling
