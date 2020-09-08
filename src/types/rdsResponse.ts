type RdsResponse<T> = {
  insertId?: string;
  records?: T[];
};

export default RdsResponse;
