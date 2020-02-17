export default str => str.split('').reduce( (result, n) => {
    return result.replace('X', n);
  }, '+X (XXX) XXX-XX-XX');
