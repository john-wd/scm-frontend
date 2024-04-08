#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
S3_BUCKET="smashcustommusic-frontend"

which aws > /dev/null
if [ $? -gt 0 ]; then
  echo "ERROR: aws cli utility not found. Please install it before proceeding"
  exit 1
fi

REGION=$(aws configure get region)

aws s3 ls s3://$S3_BUCKET > /dev/null
if [ $? -gt 0 ]; then
  # bucket does not exist, create it
  aws s3api create-bucket --bucket $S3_BUCKET
  aws s3api put-public-access-block \
    --bucket $S3_BUCKET \
    --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false"
  aws s3api put-bucket-policy --bucket $S3_BUCKET --policy file://${SCRIPT_DIR}/policy.json
fi

ng build
aws s3 cp --recursive ./dist/smash-custom-music s3://$S3_BUCKET
aws s3 website s3://$S3_BUCKET --index-document index.html --error-document index.html

echo "Url: http://$S3_BUCKET.s3-website-$REGION.amazonaws.com"
