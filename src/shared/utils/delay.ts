const delay = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));
export default delay;