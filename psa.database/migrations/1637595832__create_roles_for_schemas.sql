BEGIN;
DROP ROLE IF EXISTS loggingservice_role;
CREATE ROLE loggingservice_role;
GRANT USAGE, CREATE ON SCHEMA loggingservice TO loggingservice_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA loggingservice TO loggingservice_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA loggingservice GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO loggingservice_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA loggingservice TO loggingservice_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA loggingservice GRANT USAGE, SELECT ON SEQUENCES TO loggingservice_role;
ALTER TABLE loggingservice.system_logs OWNER TO loggingservice_role;
ALTER SEQUENCE loggingservice.system_logs_id_seq OWNER TO loggingservice_role;
REASSIGN OWNED BY loggingservice TO loggingservice_role;
DROP OWNED BY loggingservice;
DROP USER IF EXISTS loggingservice;

DROP ROLE IF EXISTS sormasservice_role;
CREATE ROLE sormasservice_role;
GRANT USAGE, CREATE ON SCHEMA sormasservice TO sormasservice_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA sormasservice TO sormasservice_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA sormasservice GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO sormasservice_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA sormasservice TO sormasservice_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA sormasservice GRANT USAGE, SELECT ON SEQUENCES TO sormasservice_role;
REASSIGN OWNED BY sormasservice TO sormasservice_role;
DROP OWNED BY sormasservice;
DROP USER IF EXISTS sormasservice;
COMMIT;
