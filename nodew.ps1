# Node.js wrapper which will download and proxy to node locally.
# This allows you to automatically manage the installed version of node.
#
# CONFIGURATION
# =============
# NODEW_INSTALL_VERSION - an env variable to specify the version of node to install - Defaults to 4.4.7
# NODEW_DIST_BASE_URL - an env variable to specify the binary download location - Defaults to NodeJS website
#
# Sample usage: ./nodew.ps1 script.js

$INSTALL_PATH="./bin"
$INSTALL_VERSION=$NODEW_INSTALL_VERSION
$DIST_BASE_URL=$NODEW_DIST_BASE_URL

# default version if not set
if (!$INSTALL_VERSION) {
  $INSTALL_VERSION="12.18.3";
}

# default download location if not set
if (!$DIST_BASE_URL) {
  $DIST_BASE_URL="https://nodejs.org/dist/";
}

# create the install directory
if (!(Test-Path $INSTALL_PATH)) {
  echo "Creating directory: $INSTALL_PATH"
  mkdir -p "$INSTALL_PATH"
}

# calculate the absolute path of the location to install files
cd $INSTALL_PATH
$INSTALL_PATH=pwd

# fetch the desired version of node if we don't have a cached version copy
$VERSION_FOLDER="node-v$INSTALL_VERSION-win-x64"
$FULL_PATH="$INSTALL_PATH/$VERSION_FOLDER"
if (!(Test-Path $FULL_PATH)) {
  echo "Fetching Node $INSTALL_VERSION to $INSTALL_PATH/node.zip";
  wget $DIST_BASE_URL/v$INSTALL_VERSION/$VERSION_FOLDER.zip -OutFile $INSTALL_PATH/node.zip
  Expand-Archive $INSTALL_PATH/node.zip -DestinationPath $INSTALL_PATH
  rm $INSTALL_PATH/node.zip
}

# start the node executable
$command = "$FULL_PATH/node.exe $args"
Invoke-expression $command