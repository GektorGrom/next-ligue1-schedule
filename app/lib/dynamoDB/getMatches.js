import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { formatInTimeZone } from 'date-fns-tz';
import { unmarshall } from '@aws-sdk/util-dynamodb';

import { sameChannel } from '../deduplicationMatches';
import getClubLogo from '../getClubLogo';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const getMatches = async (day, timeZone) => {
  const QueryInput = {
    TableName: 'BeIN_schedule',
    IndexName: 'utcDay-start-index',
    KeyConditionExpression: 'utcDay = :specificDay',
    ProjectionExpression:
      '#startTime, id, away, chanel, home, isLigueShow, isLive, title',
    ExpressionAttributeNames: {
      '#startTime': 'start',
    },
    ExpressionAttributeValues: {
      ':specificDay': {
        S: day,
      },
    },
  };
  const dedupeMatches = await client
    .send(new QueryCommand(QueryInput))
    .then(({Items}) =>
      Items.map((Item) => unmarshall(Item))
        .filter(({isLive}) => isLive)
        .reduce((acc, next) => {
          const {chanel, start, away, home} = next;
          if (
            acc.some((el) => (
                getClubLogo(el.away) === getClubLogo(away) &&
                getClubLogo(el.home) === getClubLogo(home) &&
                (el.start + 10 * 60 * 1000 > start ||
                  el.start - 10 * 60 * 1000 < start) &&
                sameChannel(el.chanel, chanel)
              ))
          ) {
            return acc;
          }
          return acc.concat(next);
        }, []),
    );
  return dedupeMatches.map((el) => ({
      ...el,
      startTime: formatInTimeZone(new Date(el.start), timeZone, 'HH:mm'),
    }));
}

export default getMatches
