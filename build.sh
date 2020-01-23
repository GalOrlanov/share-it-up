echo "start Copy to S3" $1
aws s3 sync build/. s3://www.share-it-up.com --delete --acl public-read
echo "end" $1