import axios from '../../core/axios';

export default {
  get: () => axios.get('/patients'),
  getOne: (id, type) => axios.get(`/patients/${id}?type=${type}`),
  add: values => axios.post('/patients', values),
  remove: id => axios.delete(`/patients/${id}`),
  edit: (id, values) => axios.patch(`/patients/${id}`, values)
}