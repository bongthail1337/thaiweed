export const normalize = (num) => (Math.round(num * 100) / 100);

export const getCountReviewsInString = (count) => {
  const greaterThanZero = count === 1 ? `${count} review` : `${count} reviews`;
  return count === 0 ? 'no reviews' : greaterThanZero;
}

export const getAvgReviewsInString = (num) => {
  const avg = normalize(num);
  return Number.isNaN(avg) ? '' : `${avg.toFixed(1)} `;
}

export const getRating = (num) => {
  const avg = normalize(num);
  return Number.isNaN(avg) ? 0 : Math.round(avg);
}