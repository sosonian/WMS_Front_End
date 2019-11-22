
class ControllerUnitElementInitialState {
    constructor () {
        this.state = [
            {
                unitID:1,
                name:'MenuBar',
                title:'工具列',
                containerUnitContainerID:1,
                sequenceNumber:1,
            },
            {
                unitID:2,
                name:'SubViewFront',
                title:'前視圖',
                sequenceNumber:1,
                containerUnitContainerID:2,
            },
            {
                unitID:3,
                name:'SubViewFront',
                title:'側視圖',
                sequenceNumber:1,
                containerUnitContainerID:2,
            },
            {
                unitID:4,
                name:'TestUnit',
                title:'測試控制',
                sequenceNumber:1,
                containerUnitContainerID:3,
            },
            {
                unitID:5,
                name:'DatGui',
                title:'旋轉控制',
                sequenceNumber:1,
                containerUnitContainerID:3,
            },
            {
                unitID:6,
                name:'EditLayout',
                title:'樓層設定',
                sequenceNumber:1,
                containerUnitContainerID:4,
            }
        ]
    }
}

export default ControllerUnitElementInitialState