function uuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)

    return v.toString(16)
  })
}

class InstanceId {
  constructor () {
    if (!InstanceId.instance) {
      this.id = uuid()
      InstanceId.instance = this
    }

    return InstanceId.instance
  }
}

const instanceId = new InstanceId()
Object.freeze(instanceId)

export default instanceId