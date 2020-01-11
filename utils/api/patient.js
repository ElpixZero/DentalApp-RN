import axios from '../../core/axios';

export default {
  get: () => axios.get('/patients'),
  getOne: id => axios.get(`/patients/${id}`),
  add: values => axios.post('/patients', values),
}