import si from 'systeminformation'



export default  class SystemInformation {
  async getCpuInforMation () {
    return await si.cpu();
  }
}
