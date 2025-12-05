import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const responseTime = new Trend('response_time');

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '20s', target: 30 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],          // 95% de las requests < 800 ms
    http_req_failed: ['rate<0.01'],           // < 1% de errores
    response_time: ['avg<600'],               // métrica custom
  },
};

export default function () {
  const res = http.get('https://contratacion.gtd.cl/ofertas');

  responseTime.add(res.timings.duration);

  check(res, {
    'status is 200':      (r) => r.status === 200,
    'content-type JSON':  (r) => r.headers['Content-Type']?.includes('application/json'),
    'body not empty':     (r) => r.body && r.body.length > 0,
  });

  sleep(randomIntBetween(1, 4));
}
