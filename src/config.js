const config = {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-1",
        BUCKET: "nks19bucket",
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://8scsbfz368.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_fEyyM9k9S",
        APP_CLIENT_ID: "33u21upg9t1c2b8lmnujph9k07",
        IDENTITY_POOL_ID: "us-east-1:617379d6-1bd4-4fc0-9fc1-a76a3fb18850",
    },
};

export default config;
    