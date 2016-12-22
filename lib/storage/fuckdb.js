/**
 * a simple db model
 * @author: rapidhere@gmail.com
 */
'use strict';
const path = require('path');
const fs = require('mz/fs');

let repos = new Map();
const repoDir = path.join(__dirname, '../../storage');

// load repo content
exports.load = async function(repoName) {
  if(! repos.has(repoName)) {
    repos.set(repoName, JSON.parse(await getStorageOrCreate(repoName)));
  }

  return repos.get(repoName);
};

// store repo content
exports.store = async function(repoName, content) {
  if(content) {
    repos.set(repoName, content);
  } else {
    content = repos.get(repoName);
  }

  const repoFile = path.join(repoDir, repoName + '.json');
  await fs.writeFile(repoFile, JSON.stringify(content));
};

// get a storage or create if not exsit
async function getStorageOrCreate(repoName) {
  if(! await fs.exists(repoDir)) {
    await fs.mkdir(repoDir);
  }

  const repoFile = path.join(repoDir, repoName + '.json');
  try {
    return await fs.readFile(repoFile);
  } catch (e) {
    if(e.code === 'ENOENT') {
      return 'null';
    } else {
      throw e;
    }
  }
}