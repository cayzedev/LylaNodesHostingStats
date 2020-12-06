const axios = require('axios');

let list = {};
list.nodejs = (serverName, userID) => ({
    "name": serverName,
    "user": userID,
    "nest": 5,
    "egg": 16,
    "docker_image": "quay.io/parkervcp/pterodactyl-images:debian_nodejs-12",
    "startup": `if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi && /usr/local/bin/npm install --production && /usr/local/bin/node /home/container/{{BOT_JS_FILE}}`,
    "limits": {
        "memory": 0,
        "swap": 0,
        "disk": 0,
        "io": 500,
        "cpu": 0
    },
    "environment": {
        "INSTALL_REPO": null,
        "INSTALL_BRANCH": null,
        "USER_UPLOAD": "0",
        "AUTO_UPDATE": "0",
        "BOT_JS_FILE": "index.js"
    },
    "feature_limits": {
        "databases": 2,
        "allocations": 1,
        "backups": 10
    },
    "deploy": {
        "locations": [12],
        "dedicated_ip": false,
        "port_range": []
    },
    "start_on_completion": false
});
list.python = (serverName, userID) => ({
    "name": serverName,
    "user": userID,
    "nest": 5,
    "egg": 22,
    "docker_image": "quay.io/parkervcp/pterodactyl-images:debian_python-3.8",
    "startup": "${STARTUP_CMD}",
    "limits": {
        "memory": 0,
        "swap": 0,
        "disk": 0,
        "io": 500,
        "cpu": 0
    },
    "environment": {
        "STARTUP_CMD": "bash"
    },
    "feature_limits": {
        "databases": 2,
        "allocations": 1,
        "backups": 10
    },
    "deploy": {
        "locations": [12],
        "dedicated_ip": false,
        "port_range": []
    },
    "start_on_completion": false
})
list.aio = (serverName, userID) => ({
    "name": serverName,
    "user": userID,
    "nest": 5,
    "egg": 46,
    "docker_image": "danielpmc/discordnode8",
    "startup": "${STARTUP_CMD}",
    "limits": {
        "memory": 0,
        "swap": 0,
        "disk": 0,
        "io": 500,
        "cpu": 0
    },
    "environment": {
        "STARTUP_CMD": "bash"
    },
    "feature_limits": {
        "databases": 2,
        "allocations": 1,
        "backups": 10
    },
    "deploy": {
        "locations": [12],
        "dedicated_ip": false,
        "port_range": []
    },
    "start_on_completion": false
})
list.java = (serverName, userID) => ({
    "name": serverName,
    "user": userID,
    "nest": 5,
    "egg": 25,
    "docker_image": "quay.io/parkervcp/pterodactyl-images:debian_openjdk-8-jre",
    "startup": "${STARTUP_CMD}",
    "limits": {
        "memory": 0,
        "swap": 0,
        "disk": 0,
        "io": 500,
        "cpu": 0
    },
    "environment": {
        "STARTUP_CMD": "bash"
    },
    "feature_limits": {
        "databases": 2,
        "allocations": 1,
        "backups": 10
    },
    "deploy": {
        "locations": [12],
        "dedicated_ip": false,
        "port_range": []
    },
    "start_on_completion": false
})
list.mumble = (serverName, userID) => ({
    "name": serverName,
    "user": userID,
    "nest": 3,
    "egg": 12,
    "docker_image": "quay.io/pterodactyl/core:glibc",
    "startup": `./murmur.x86 -fg`,
    "limits": {
        "memory": 0,
        "swap": 0,
        "disk": 0,
        "io": 500,
        "cpu": 0
    },
    "environment": {
        "MAX_USERS": "100",
        "MUMBLE_VERSION": "1.3.1"
    },
    "feature_limits": {
        "databases": 2,
        "allocations": 1,
        "backups": 10
    },
    "deploy": {
        "locations": [12],
        "dedicated_ip": false,
        "port_range": []
    },
    "start_on_completion": false,
    "oom_disabled": false
})
list.redis = (serverName, userID) => ({
    "name": serverName,
    "user": userID,
    "nest": 12,
    "egg": 36,
    "docker_image": "quay.io/parkervcp/pterodactyl-images:db_redis-6",
    "startup": "/usr/local/bin/redis-server /home/container/redis.conf --save 60 1 --dir /home/container/ --bind 0.0.0.0 --port {{SERVER_PORT}} --requirepass {{SERVER_PASSWORD}} --maxmemory {{SERVER_MEMORY}}mb --daemonize yes && redis-cli -p {{SERVER_PORT}} -a {{SERVER_PASSWORD}}; redis-cli -p {{SERVER_PORT}} -a {{SERVER_PASSWORD}} shutdown save",
    "limits": {
        "memory": 0,
        "swap": 0,
        "disk": 0,
        "io": 500,
        "cpu": 0
    },
    "environment": {
        "SERVER_PASSWORD": "P@55w0rd"
    },
    "feature_limits": {
        "databases": 2,
        "allocations": 1,
        "backups": 10
    },
    "deploy": {
        "locations": [12],
        "dedicated_ip": false,
        "port_range": []
    },
    "start_on_completion": false,
    "oom_disabled": false
})
list.postgres = (serverName, userID) => ({
    "name": serverName,
    "user": userID,
    "nest": 12,
    "egg": 37,
    "docker_image": "quay.io/parkervcp/pterodactyl-images:db_postgres",
    "startup": `postgres  -D /home/container/postgres_db/`,
    "limits": {
        "memory": 0,
        "swap": 0,
        "disk": 0,
        "io": 500,
        "cpu": 0
    },
    "environment": {
        "PGPASSWORD": "P@55word",
        "PGROOT": "ZPWgpMN4hETqjXAV",
        "PGUSER": "pterodactyl",
        "PGDATABASE": "pterodactyl"
    },
    "feature_limits": {
        "databases": 2,
        "allocations": 1,
        "backups": 10
    },
    "deploy": {
        "locations": [12],
        "dedicated_ip": false,
        "port_range": []
    },
    "start_on_completion": false,
    "oom_disabled": false
})
let data = (serverName, userID) => {
    let toReturn = {
        nodejs: null,
        python: null,
        aio: null,
        java: null,
        mumble: null,
        mongodb: null,
        redis: null,
        postgres: null
    };

    for (let [name, filled] of Object.entries(list)) {
        toReturn[name] = filled(serverName, userID);
    }
    return toReturn;
};

let createServer = (data) => {
    return axios({
        url: config.Pterodactyl.hosturl + "/api/application/servers",
        method: 'POST',
        followRedirect: true,
        maxRedirects: 5,
        headers: {
            'Authorization': 'Bearer ' + config.Pterodactyl.apikey,
            'Content-Type': 'application/json',
            'Accept': 'Application/vnd.pterodactyl.v1+json',
        },
        data: data,
    })
}

module.exports = {
    createParams: data,
    createServer: createServer
};