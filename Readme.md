## Description

Bakalauras

## You can start up the project with make commands

```bash
$ make create-env-files
$ make install-npm
$ make start-services
$ make prepare-db
$ make start-server
```

If it's first time running this project, make seed database

```bash
$ make seed-db
```

If you're having some package installing issues, run the following commands:

```bash
$ make clear-npm
$ make install-npm
```

## Common errors

If you get a permission error while executing make command, you need to grant permissions for that .sh file you are trying to run:

```bash
$ cd ./scripts
$ sudo chmod +x env.sh
$ sudo chmod +x packages.sh
$ sudo chmod +x prepare-db.sh
$ sudo chmod +x seed-db.sh
$ sudo chmod +x clearPackages.sh
$ sudo chmod +x startServices.sh
```

## Errors that I've run into working in WINDOWS ;\_;

"operation not permitted" when running prism generate --- app must not be running
incorrect node_modules built (wrong file system) --- build node_modules through linux distro (for example ubuntu)

## Installation on MacOs (M1, M2)

Dependency installation must be done on "Darwin" platform and for that reason you will experience issue with running backend.
There is some workaround which allow to install dependencies using Pararel:

1. Install "Pararel" tool
2. Install UBUNTU (ARM64) on virtual machine
3. Install all developer packages like GIT, NPM, YARN, NODEJS etc.
4. Share your main user folder (Actions > Configure > Sharing) and restart virtual system
5. Go to repo directory (on your Macos system)
6. Install dependency from App folder
7. Continue steps from Readme (skipping "make install-npm")

## Other errors

TRPCLink<AnyRouter>' is not assignable to type --- package version missmatch, check node_modules package version too, might need a clean installyarn st
Error: Unexpected end of JSON input --- while generating prisma; delete \*-prisma-client and generated .prisma files from the folder.

