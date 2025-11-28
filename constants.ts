import { AppData } from './types';

// Based on the user provided JSON structure, expanded for demo purposes
export const TECH_STACK_DATA: AppData = {
  "Common Application Stacks": {
    "PHP": {
      "KnownRisk": "PHP apps often expose sensitive debugging output or rely on user-controlled file paths, increasing risk of file inclusion and insecure handling of uploads.",
      "ConfigFiles": ["php.ini", ".user.ini", "config.php", "wp-config.php", "local-config.php", "configuration.php (Joomla)", "settings.php (Drupal)"],
      "Variables": ["$_SERVER", "$_ENV", "$_GET", "$_POST", "$_COOKIE", "$_FILES", "$GLOBALS"],
      "CommonDirectories": ["includes/", "vendor/", "public/", "uploads/", "admin/", "assets/"],
      "LogFiles": ["php_error.log", "debug.log", "access.log"],
      "BackupFiles": ["*.php.bak", "*.php.old", "*.php~", "*.php.save"],
      "ExposedEndpoints": ["/info.php", "/phpinfo.php", "/test.php", "/admin/", "/vendor/phpunit/ (RCE vulnerability)"],
      "EnvironmentVariables": ["PHP_VERSION", "DOCUMENT_ROOT", "DB_HOST", "DB_USER", "DB_PASSWORD"],
      "DebugModes": ["display_errors=On", "log_errors=Off", "allow_url_include=On"],
      "CommonVulnerabilities": ["File Inclusion (LFI/RFI)", "Deserialization (unserialize())", "Command Injection (system(), exec())", "Insecure File Upload"],
      "DefaultCredentials": ["(Application Specific, e.g., admin:admin)"],
      "UsefulTools": ["phpggc (Gadget Chains)", "WordPress/Specific CMS Scanners"]
    },
    "Ruby": {
      "KnownRisk": "Ruby stacks may expose development consoles or trust input in unsafe serialization functions, increasing risk of path or object manipulation.",
      "ConfigFiles": ["config.ru", ".env", "Gemfile"],
      "Variables": ["ENV", "$LOAD_PATH"],
      "CommonDirectories": ["lib/", "bin/", "public/"],
      "LogFiles": ["application.log"],
      "BackupFiles": ["*.rb.bak"],
      "ExposedEndpoints": ["/console"],
      "EnvironmentVariables": ["RACK_ENV"],
      "DebugModes": ["rackup --debug"],
      "CommonVulnerabilities": ["Deserialization", "Path Traversal"],
      "UsefulTools": ["rack-mini-profiler"]
    },
    "Node.js": {
      "KnownRisk": "Node ecosystems depend heavily on third-party packages, increasing exposure to prototype pollution, unsafe command wrappers, or weak JWT settings.",
      "ConfigFiles": ["package.json", "package-lock.json", ".env", "tsconfig.json", "webpack.config.js", "ecosystem.config.js", "config.js", "app.js", "server.js"],
      "CommonDirectories": ["node_modules/", "dist/", "src/", "public/", "views/", "routes/", "config/"],
      "LogFiles": ["npm-debug.log", "yarn-error.log", "pm2.log", "error.log", "app.log", "forever logs"],
      "EnvironmentVariables": ["NODE_ENV", "PORT", "DATABASE_URL", "JWT_SECRET", "AWS_ACCESS_KEY_ID"],
      "DebugModes": ["NODE_ENV=development", "--inspect", "NODE_DEBUG=*", "DEBUG=*"],
      "ExposedEndpoints": ["/metrics", "/debug", "/graphql", "/phpmyadmin/ (possible misrouting)"],
      "CommonVulnerabilities": ["Prototype Pollution", "Command Injection", "SQL/NoSQL Injection", "Path Traversal", "JWT Misconfiguration"],
      "DefaultCredentials": ["(Application Specific)"],
      "UsefulTools": ["retire.js", "npm audit"]
    }
  },

  "WebServers": {
    "Tomcat": {
      "KnownRisk": "Default management consoles and weak credentials frequently expose administrative access, and older connector settings may leak internal files.",
      "ConfigFiles": ["server.xml", "web.xml", "context.xml", "tomcat-users.xml", "catalina.policy"],
      "Variables": ["CATALINA_HOME", "JAVA_OPTS", "JRE_HOME"],
      "CommonDirectories": ["webapps/", "conf/", "logs/", "bin/", "work/", "temp/"],
      "LogFiles": ["catalina.out", "localhost.log", "manager.log", "host-manager.log"],
      "BackupFiles": ["server.xml.bak", "web.xml.old", "*.war.bak"],
      "ExposedEndpoints": ["/manager/", "/host-manager/", "/docs/", "/examples/"],
      "EnvironmentVariables": ["CATALINA_BASE", "CATALINA_OPTS"],
      "DebugModes": ["-Xdebug", "-Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=*:5005"],
      "CommonVulnerabilities": ["Manager App Access", "JSP File Upload Bypass", "Ghostcat (CVE-2020-1938)"],
      "DefaultCredentials": ["tomcat:tomcat", "admin:admin", "role1:role1", "both:tomcat", "(Check tomcat-users.xml for plaintext credentials)"],
      "UsefulTools": ["Metasploit (tomcat_mgr_deploy)", "Ghostcat Scanner"]
    },

    "Nginx": {
      "KnownRisk": "Misconfigured alias or status endpoints can expose internal files or system metadata, enabling information disclosure or unintended access.",
      "ConfigFiles": ["nginx.conf", "sites-enabled/default", "conf.d/*.conf", "mime.types"],
      "Variables": ["$host", "$uri", "$remote_addr", "$request_filename"],
      "CommonDirectories": ["/etc/nginx/", "/var/log/nginx/", "/usr/share/nginx/html/"],
      "LogFiles": ["/var/log/nginx/access.log", "/var/log/nginx/error.log"],
      "BackupFiles": ["nginx.conf.bak", "default.old"],
      "ExposedEndpoints": ["/nginx_status"],
      "EnvironmentVariables": ["NGINX_VERSION"],
      "DebugModes": ["error_log debug;"],
      "CommonVulnerabilities": ["Path Traversal (alias)", "Header Injection", "CRLF Injection", "Arbitrary File Upload"],
      "DefaultCredentials": ["(None)"],
      "UsefulTools": ["Nmap NSE http-nginx-version"]
    },

    "Apache": {
      "KnownRisk": "Exposed server-info/status pages, permissive .htaccess rules, or outdated CGI components increase risk of information leakage or unintended script execution.",
      "ConfigFiles": ["httpd.conf", "apache2.conf", ".htaccess", "ports.conf", "sites-available/000-default.conf", "httpd-vhosts.conf"],
      "Variables": ["ServerName", "DocumentRoot", "ServerTokens", "ServerSignature"],
      "CommonDirectories": ["/var/www/", "/cgi-bin/", "/htdocs/", "/etc/apache2/"],
      "LogFiles": ["/var/log/apache2/access_log", "/var/log/apache2/error_log"],
      "BackupFiles": ["httpd.conf.old", ".htaccess.bak"],
      "ExposedEndpoints": ["/server-status", "/server-info", "/cgi-bin/test-cgi"],
      "EnvironmentVariables": ["APACHE_RUN_USER", "APACHE_PID_FILE"],
      "DebugModes": ["LogLevel debug", "TraceEnable On"],
      "CommonVulnerabilities": [".htaccess Misconfiguration", "Shellshock (CVE-2014-6271)", "Log Poisoning", "HTTP Verb Tampering"],
      "DefaultCredentials": ["(None)"],
      "UsefulTools": ["gobuster", "dirb"]
    }
  },

  "Databases": {
    "MySQL": {
      "KnownRisk": "Weak or blank root credentials and permissive file-write configurations can allow unauthorized access or unintended file operations.",
      "ConfigFiles": ["my.cnf", "my.ini", "mysql.conf"],
      "Variables": ["version", "datadir", "secure_file_priv"],
      "CommonDirectories": ["/var/lib/mysql/", "/etc/mysql/", "/usr/share/mysql/"],
      "LogFiles": ["error.log", "slow_query.log", "general.log"],
      "BackupFiles": ["*.sql", "*.myd", "*.myi", "*.frm"],
      "ExposedEndpoints": ["Port 3306", "phpMyAdmin", "Adminer"],
      "EnvironmentVariables": ["MYSQL_ROOT_PASSWORD (containerized)", "MYSQL_DATABASE", "MYSQL_USER"],
      "DebugModes": ["general_log=ON", "log_output=FILE"],
      "CommonVulnerabilities": ["Weak/default creds", "UDF RCE", "Outfile file-write", "Privilege escalation"],
      "DefaultCredentials": ["root:(blank)", "root:root", "admin:admin"],
      "UsefulTools": ["sqlmap", "mysql client", "Metasploit"]
    },

    "Redis": {
      "KnownRisk": "Redis frequently runs without authentication and trusts the local network, making exposed instances vulnerable to unauthorized data access or modification.",
      "ConfigFiles": ["redis.conf"],
      "ExposedEndpoints": ["Port 6379"],
      "CommonVulnerabilities": ["Unauthenticated Access (RCE via cron/ssh key)"]
    },

    "PostgreSQL": {
      "KnownRisk": "Misconfigured pg_hba.conf or permissive COPY PROGRAM privileges can enable unintended command execution or unauthorized connections.",
      "ConfigFiles": ["postgresql.conf", "pg_hba.conf", "pg_ident.conf"],
      "Variables": ["current_setting", "version()"],
      "CommonDirectories": ["/var/lib/postgresql/", "/etc/postgresql/", "/usr/share/postgresql/"],
      "LogFiles": ["postgresql-*.log", "pg_log/"],
      "BackupFiles": ["*.sql", "*.backup"],
      "ExposedEndpoints": ["pgAdmin", "phpPgAdmin"],
      "EnvironmentVariables": ["PGDATA", "PGUSER", "POSTGRES_PASSWORD"],
      "DebugModes": ["log_min_messages=debug", "log_statement=all"],
      "CommonVulnerabilities": ["COPY PROGRAM RCE", "Weak Creds", "Large Object Abuse"],
      "DefaultCredentials": ["postgres:postgres"],
      "UsefulTools": ["psql", "Metasploit"]
    },

    "MongoDB": {
      "KnownRisk": "Unauthenticated deployments and permissive query operators (e.g., $where) can lead to unauthorized access or unintended code execution.",
      "ConfigFiles": ["mongod.conf", ".mongorc.js"],
      "Variables": ["db.version()", "process.env"],
      "CommonDirectories": ["/var/lib/mongodb/", "/data/db/"],
      "LogFiles": ["mongod.log"],
      "BackupFiles": ["*.bson", "dump/", "mongodump/"],
      "ExposedEndpoints": ["Mongo Express", "RockMongo"],
      "EnvironmentVariables": ["MONGO_INITDB_ROOT_USERNAME", "MONGO_INITDB_ROOT_PASSWORD"],
      "DebugModes": ["verbose logging"],
      "CommonVulnerabilities": ["No Auth", "NoSQL Injection", "JS Injection ($where)", "Privilege Escalation"],
      "DefaultCredentials": ["admin:admin"],
      "UsefulTools": ["mongo client", "NoSQLMap"]
    }
  },

  "Frameworks_CMS": {
    "WordPress": {
      "KnownRisk": "The large plugin ecosystem introduces frequent vulnerabilities, and exposed XML‑RPC or login endpoints aid enumeration or brute-force attempts.",
      "ConfigFiles": ["wp-config.php", ".htaccess", "wp-content/themes/*/functions.php", "wp-content/plugins/*/*.php"],
      "Variables": ["$wpdb", "DB_NAME", "DB_USER", "DB_PASSWORD", "AUTH_KEY", "NONCE_KEY"],
      "CommonDirectories": ["wp-content/", "wp-admin/", "wp-includes/", "wp-content/uploads/"],
      "LogFiles": ["wp-content/debug.log"],
      "BackupFiles": ["wp-config.php.bak", "wp-config.php.save", "*.sql"],
      "ExposedEndpoints": ["/wp-admin/", "/wp-json/wp/v2/", "/wp-login.php", "/xmlrpc.php"],
      "EnvironmentVariables": ["WP_ENV", "WP_HOME", "WP_SITEURL"],
      "DebugModes": ["WP_DEBUG=true", "WP_DEBUG_LOG=true"],
      "CommonVulnerabilities": ["Plugin/Theme Vulns", "XML-RPC Abuse", "User Enumeration", "SQLi"],
      "DefaultCredentials": ["admin:admin", "admin:password"],
      "UsefulTools": ["WPScan"]
    },

    "Django": {
      "KnownRisk": "Running in DEBUG mode or exposing secret keys can reveal sensitive system information and weaken authentication or session integrity.",
      "ConfigFiles": ["settings.py", "wsgi.py"],
      "EnvironmentVariables": ["DJANGO_SETTINGS_MODULE", "SECRET_KEY"],
      "ExposedEndpoints": ["/admin/"],
      "DebugModes": ["DEBUG = True"]
    },

    "SpringBoot": {
      "KnownRisk": "Unprotected Actuator endpoints and unsafe expression evaluation (SpEL) may expose sensitive configuration or enable unintended actions.",
      "ConfigFiles": ["application.properties", "application.yml", "bootstrap.yml", "logback-spring.xml"],
      "Variables": ["@Value()", "System.getProperty", "#{...}"],
      "CommonDirectories": ["resources/", "static/", "templates/", "META-INF/"],
      "LogFiles": ["spring.log", "application.log"],
      "BackupFiles": ["application.properties.bak", "application.yml.old"],
      "ExposedEndpoints": ["/actuator/", "/actuator/env", "/actuator/heapdump"],
      "EnvironmentVariables": ["SPRING_PROFILES_ACTIVE", "SPRING_CLOUD_CONFIG_URI", "SPRING_DATASOURCE_PASSWORD"],
      "DebugModes": ["logging.level.root=DEBUG", "management.endpoints.web.exposure.include=*"],
      "CommonVulnerabilities": ["Spring4Shell", "Actuator Exposure", "SpEL Injection"],
      "DefaultCredentials": ["(Actuator often unauthenticated)"],
      "UsefulTools": ["SpringBootExploit"]
    },

    "Flask": {
      "KnownRisk": "The Flask debugger and template engine can expose internal system details or evaluate unintended template expressions if misconfigured.",
      "ConfigFiles": ["config.py", ".env", "settings.py"],
      "Variables": ["os.environ", "app.config"],
      "CommonDirectories": ["instance/", "templates/", "static/"],
      "LogFiles": ["flask.log"],
      "BackupFiles": ["*.py.bak"],
      "ExposedEndpoints": ["/console"],
      "EnvironmentVariables": ["FLASK_ENV", "SECRET_KEY"],
      "DebugModes": ["FLASK_ENV=development"],
      "CommonVulnerabilities": ["Debug Console RCE", "Server-Side Template Injection"],
      "UsefulTools": ["Flask-DebugToolbar"]
    }
  },

  "AdditionalTechnologies": {
    "Docker": {
      "KnownRisk": "Exposed Docker sockets or privileged containers can allow full host compromise due to bypassed container isolation.",
      "ConfigFiles": ["Dockerfile", "docker-compose.yml", ".dockerignore", "daemon.json"],
      "CommonDirectories": ["/var/lib/docker/", "/etc/docker/", "~/.docker/"],
      "LogFiles": ["docker logs <container>", "/var/log/docker.log"],
      "ExposedEndpoints": ["Docker API (2375/2376)", "/var/run/docker.sock"],
      "EnvironmentVariables": ["DOCKER_HOST", "DOCKER_TLS_VERIFY"],
      "DebugModes": ["--debug", "\"debug\": true in daemon.json"],
      "CommonVulnerabilities": ["Privileged Container Escape", "Docker Socket Exposure"],
      "UsefulTools": ["dive", "trivy", "grype"]
    },

    "Kubernetes": {
      "KnownRisk": "Misconfigured RBAC permissions, exposed kubelet endpoints, or privileged pods can provide escalation paths across the cluster.",
      "ConfigFiles": ["~/.kube/config", "/etc/kubernetes/", "/var/run/secrets/kubernetes.io/serviceaccount/"],
      "CommonDirectories": ["~/.kube/", "/etc/kubernetes/"],
      "ExposedEndpoints": ["Kubernetes API (443)", "kubelet (10250)", "etcd (2379)"],
      "EnvironmentVariables": ["KUBERNETES_PORT", "POD_NAME", "POD_NAMESPACE"],
      "DebugModes": ["--v=4", "audit logging"],
      "CommonVulnerabilities": ["Privileged Pods", "Misconfigured RBAC"],
      "UsefulTools": ["kubectl", "kube-hunter"]
    },

    "Laravel": {
      "KnownRisk": "Exposed .env files and debug interfaces often reveal application keys, database credentials, and other secrets.",
      "ConfigFiles": ["config/app.php", "config/database.php", ".env", "composer.json"],
      "Variables": ["env()", "config()", "$_ENV"],
      "CommonDirectories": ["app/", "routes/", "storage/", "resources/", "vendor/"],
      "LogFiles": ["storage/logs/laravel.log"],
      "BackupFiles": ["*.php.bak", ".env.bak"],
      "ExposedEndpoints": ["/storage/logs/", "/telescope/", "/_debugbar"],
      "EnvironmentVariables": ["APP_KEY", "APP_ENV", "DB_PASSWORD"],
      "DebugModes": ["APP_DEBUG=true"],
      "CommonVulnerabilities": ["Debug Mode Exposure", "Mass Assignment", "Insecure .env Access"],
      "UsefulTools": ["Laravel Telescope", "Laravel Debugbar"]
    },

    "FastAPI": {
      "KnownRisk": "Public Swagger/OpenAPI documentation may reveal authentication flows, parameter structures, and internal routes.",
      "ConfigFiles": ["settings.py", "config.py"],
      "Variables": ["os.environ", "Settings(BaseModel)"],
      "CommonDirectories": ["app/", "logs/", "static/"],
      "LogFiles": ["app.log"],
      "BackupFiles": ["*.py.bak"],
      "ExposedEndpoints": ["/docs", "/redoc"],
      "EnvironmentVariables": ["API_KEY", "DATABASE_URL"],
      "DebugModes": ["reload=True"],
      "CommonVulnerabilities": ["OpenAPI Exposure", "Auth Misconfiguration"],
      "UsefulTools": ["uvicorn --debug"]
    },

    "GoLang": {
      "KnownRisk": "Go’s pprof/debug endpoints can expose runtime data, and unsafe file operations may lead to unintended directory access.",
      "ConfigFiles": ["config.json", "app.yaml", ".env"],
      "Variables": ["os.Getenv()", "flag variables"],
      "CommonDirectories": ["cmd/", "pkg/", "internal/", "logs/"],
      "LogFiles": ["app.log"],
      "BackupFiles": ["*.go.bak"],
      "ExposedEndpoints": ["/debug/pprof/", "/metrics"],
      "EnvironmentVariables": ["GO_ENV", "DATABASE_URL"],
      "DebugModes": ["GODEBUG=*"],
      "CommonVulnerabilities": ["Directory Traversal", "Race Conditions"],
      "UsefulTools": ["pprof", "go vet"]
    },

    "Elasticsearch": {
      "KnownRisk": "Unauthenticated API endpoints can expose cluster operations and data, and insecure plugin systems may allow unintended behavior.",
      "ConfigFiles": ["elasticsearch.yml", "jvm.options"],
      "Variables": ["cluster.name", "node.name"],
      "CommonDirectories": ["/var/lib/elasticsearch/", "/etc/elasticsearch/"],
      "LogFiles": ["elasticsearch.log"],
      "BackupFiles": ["*.json.bak"],
      "ExposedEndpoints": ["/_cat", "/_search", "/_cluster"],
      "EnvironmentVariables": ["ES_JAVA_OPTS"],
      "DebugModes": ["logger.level=debug"],
      "CommonVulnerabilities": ["Unauthenticated API Access", "RCE via Plugins"],
      "UsefulTools": ["ElasticDump"]
    },

    "AWS": {
      "KnownRisk": "Misconfigured IAM roles, public cloud resources, or leaked credentials can expose accounts to privilege escalation or data access.",
      "ConfigFiles": ["~/.aws/credentials", "~/.aws/config"],
      "Variables": ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_SESSION_TOKEN"],
      "CommonDirectories": ["~/.aws/"],
      "LogFiles": ["CloudWatch Logs", "CloudTrail Logs"],
      "ExposedEndpoints": ["Instance Metadata Service", "Public S3 Buckets"],
      "EnvironmentVariables": ["AWS_PROFILE", "AWS_DEFAULT_REGION"],
      "DebugModes": ["AWS CLI --debug"],
      "CommonVulnerabilities": ["IAM Privilege Escalation", "Public S3 Buckets"],
      "UsefulTools": ["awscli", "Pacu", "CloudMapper"]
    },

    "Azure": {
      "KnownRisk": "Broad role assignments or weakness in access control configuration may allow unintended access to Azure resources.",
      "ConfigFiles": ["azureProfile.json", "azureConfig.json"],
      "Variables": ["AZURE_TENANT_ID", "AZURE_CLIENT_ID"],
      "CommonDirectories": ["~/.azure/"],
      "LogFiles": ["Azure Activity Logs"],
      "BackupFiles": ["azureProfile.bak"],
      "ExposedEndpoints": ["Metadata Service"],
      "EnvironmentVariables": ["AZURE_SUBSCRIPTION_ID"],
      "DebugModes": ["--debug"],
      "CommonVulnerabilities": ["Role Assignment Misconfigurations"],
      "UsefulTools": ["Azure CLI", "Az PowerShell"]
    },

    "GCP": {
      "KnownRisk": "Overly permissive IAM roles and exposed service account credentials can provide project-wide control to unauthorized actors.",
      "ConfigFiles": ["application_default_credentials.json", "gcloud config"],
      "Variables": ["GOOGLE_APPLICATION_CREDENTIALS"],
      "CommonDirectories": ["~/.config/gcloud/"],
      "LogFiles": ["Stackdriver logs"],
      "BackupFiles": ["*.json.bak"],
      "ExposedEndpoints": ["GCP Metadata Service"],
      "EnvironmentVariables": ["GCP_PROJECT"],
      "DebugModes": ["gcloud --verbosity debug"],
      "CommonVulnerabilities": ["Overly permissive IAM roles"],
      "UsefulTools": ["gcloud", "gsutil"]
    }
  },

  "OtherTechnologies": {
    "RabbitMQ": {
      "KnownRisk": "Exposed management interfaces combined with default credentials can give unauthorized users control over message queues.",
      "ConfigFiles": ["rabbitmq.conf", "advanced.config"],
      "Variables": ["RABBITMQ_NODENAME", "RABBITMQ_CONFIG_FILE"],
      "CommonDirectories": ["/var/lib/rabbitmq/", "/etc/rabbitmq/"],
      "LogFiles": ["rabbitmq.log", "startup_log"],
      "BackupFiles": ["rabbitmq.conf.bak"],
      "ExposedEndpoints": ["/api/", "/metrics"],
      "EnvironmentVariables": ["RABBITMQ_DEFAULT_USER", "RABBITMQ_DEFAULT_PASS"],
      "DebugModes": ["rabbitmq-server --log-level debug"],
      "CommonVulnerabilities": ["Default Credentials", "Management Interface Exposure"],
      "UsefulTools": ["rabbitmqadmin"]
    },

    "Memcached": {
      "KnownRisk": "Unauthenticated Memcached instances exposed to a network can reveal cached data or allow unintended data manipulation.",
      "ConfigFiles": ["memcached.conf"],
      "Variables": ["-m", "-p", "-u"],
      "CommonDirectories": ["var/run/memcached/"],
      "LogFiles": ["memcached.log"],
      "BackupFiles": ["memcached.conf.bak"],
      "ExposedEndpoints": ["Port 11211"],
      "EnvironmentVariables": ["MEMCACHED_MEMORY", "MEMCACHED_PORT"],
      "DebugModes": ["-vv"],
      "CommonVulnerabilities": ["Unauthorized Access", "Data Dump Exposure"],
      "UsefulTools": ["memcdump", "stats"]
    },

    "Jenkins": {
      "KnownRisk": "Exposed script consoles or CLI endpoints can bypass traditional controls and allow administrative-level operations.",
      "ConfigFiles": ["config.xml", "credentials.xml", "jenkins.yaml"],
      "Variables": ["JENKINS_HOME"],
      "CommonDirectories": ["~/.jenkins/", "plugins/", "jobs/"],
      "LogFiles": ["jenkins.log", "build.log"],
      "BackupFiles": ["config.xml.bak"],
      "ExposedEndpoints": ["/script", "/manage", "/cli/"],
      "EnvironmentVariables": ["JENKINS_URL"],
      "DebugModes": ["--webroot=%TEMP%\\jenkins --debug"],
      "CommonVulnerabilities": ["Script Console RCE", "Open CLI"],
      "UsefulTools": ["jenkins-cli"]
    },

    "Git": {
      "KnownRisk": "Exposed .git directories can reveal complete source histories, internal credentials, and sensitive configuration files.",
      "CommonDirectories": [".git/", ".git/hooks/", ".git/objects/"],
      "ConfigFiles": [".git/config", ".gitignore"],
      "CommonVulnerabilities": ["Exposed .git directory"]
    }
  }
};