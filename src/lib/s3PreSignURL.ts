import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default async function createSignedUrl(key: string) {
  const region = process.env.S3_REGION;
  const bucket = process.env.S3_BUCKET;

  const client = new S3Client({ region });
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn: 3600 });
}
