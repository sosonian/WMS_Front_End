

//import LinkedList from './LinkList' 


class LinkedListNode {
    constructor(data, next=null){
        this.data=data
        this.next=next
    }
}

class LinkedList {
    constructor(){
        this.head = null;
        this.length = 0;
    }

    insertFirst(data){
        this.head = new LinkedListNode(data, this.head)
        this.length++
    }

    insertLast(data){
        let node = new LinkedListNode(data);
        let current;
        if(!this.head)
        {
            this.head = node;
        }
        else
        {
            current = this.head
            while(current.next)
            {
                current=current.next
            }
            current.next=node
        }
        this.length++
    }

    insertAt(data, index){
        // if index > length, means insertLast
        if(index>this.length)
        {
            console.log('Index Over Range')
        }
        // Insert at index[0], means insert first
        else if(index===0)
        {
            this.insertFirst(data)
        }
        // Index is negtive, not valid, stop function
        else if(index<0)
        {
            console.log('Index is negtive, not valid')
        }
        else
        {
            let node = new LinkedListNode(data);
            let current
            let previous
            let count = 0

            current=this.head

            while(count < index){
                previous = current
                count++
                current = current.next
            }
            node.next = current
            previous.next = node

            this.length ++
        }
    }

    getAt(index) {

        if(index<0 || index > this.length)
        {
            const errMsg = new Error('index not valid (out of length or is negtive)')
            throw errMsg
            //return
        }
        else
        {
            let current = this.head
            let count = 0

            while(current)
            {
                if(count == index)
                {
                    //console.log(current.data)
                    return current.data
                }
                count++
                current= current.next
            }
        }
    }

    shiftTo(index, targetIndex){
        // console.log('length : ',this.length)
        if(index<0 || targetIndex <0 || index>this.length || targetIndex> this.length)
        {
            return 
        }
        else
        {
            if(index===targetIndex)
            {
                return
            }
            else
            {
                let tempData = this.getAt(index)
                this.removeAt(index)
                this.insertAt(tempData, targetIndex)
            }
        }
    }


    //// BigO = (n)

    shiftToLast(index){
        if(index<0 || index > this.length-1)
        {
            const errMsg = new Error('index not valid (out of length or is negtive)')
            throw errMsg
        }
        else
        {
            if(index === this.length-1)
            {
                return
            }
            else if(index === 0)
            {
                let tempData= this.head.data
                this.head=this.head.next
                this.insertLast(tempData)
                this.length--
            }
            else
            {
                let tempNode = new LinkedListNode();
                let previous = null
                let current = this.head
                let count = 0

               while(current.next)
                {
                    if(count === index)
                    {
                        tempNode.data = current.data
                        previous.next = current.next
                    }
                    count++
                    previous = current
                    current = current.next
                }
                current.next = tempNode
            }
        }
    }

    removeLast(){
        this.removeAt(this.length-1)
    }

    removeAt(index) {
        if(index<0 || index > this.length)
        {
            return
        }
        else if(index===0)
        {
            this.head=this.head.next
            this.length--
        }
        else
        {
            let current=this.head
            let previous
            let count=0
            while(count<index)
            {
                count++
                previous=current
                current=current.next
            }
            previous.next=current.next
            this.length--
        }
    }

    //// BigO = (n)
    cloneList(){
        let clone = new LinkedList()
        let current = this.head
        
        while(current)
        {
            let tempNodeData = {...current.data}
            clone.insertLast(tempNodeData)
            current = current.next
            console.log(clone)
        }

        

        return clone

    }

    printList(){
        let current = this.head
        while(current){
            console.log(current.data)
            current= current.next
        }
    }

    clearList(){
        this.head = null
        this.length = 0
    }
}

const controllerUnitState=[
    {
        unitID:1,
        name:'DatGui',
        title:'旋轉控制',
        containerUnitContainerID:1,
        sequenceNumber:0,
        showing:true
    },
    {
        unitID:2,
        name:'SubViewFront',
        title:'前視圖',
        sequenceNumber:0,
        containerUnitContainerID:2,
        showing:true
    },
    {
        unitID:3,
        name:'SubViewFront',
        title:'側視圖',
        sequenceNumber:0,
        containerUnitContainerID:3,
        showing:true
    },
    {
        unitID:4,
        name:'TestUnit',
        title:'測試控制',
        sequenceNumber:0,
        containerUnitContainerID:3,
        showing:false
    }
]

const containerNumber = 4 

function createContainerState() {
    let containerStateArray = []
    
    for (var i=0; i<containerNumber; i++)
    {
        let posX=200*Math.floor(i/3)
        let posY
        if(i%3===0)
        {
            posY=0
        }
        else if(i%3===1)
        {
            posY=200
        }
        else if(i%3===2)
        {
            posY=400
        }
        let tempLinkedList =new LinkedList()
        let containerStateObj={
            containerID:i+1,
                size:
                {
                    width:200,
                    height:200
                },
                position:{
                    x:posX,
                    y:posY
                },
                zIndex:i+1,
                showing:true,
                controllerUnitList:tempLinkedList
        }
        containerStateArray.push(containerStateObj)
    }

    return containerStateArray
}


function loadUnitStateToContainer(containerStateArray){
    let tempUnitArray = controllerUnitState   
    let tempContainerArray = containerStateArray
   

    tempUnitArray.map((unitState=>{
        if(unitState.containerUnitContainerID>0 && unitState.containerUnitContainerID<Number(tempContainerArray.length+1))
        {
            let index = unitState.containerUnitContainerID-1
            let tempList = tempContainerArray[index].controllerUnitList
            tempList.insertLast(unitState)
            tempContainerArray[index].controllerUnitList = tempList
        }
    }))

    return tempContainerArray
}


//let output = loadUnitStateToContainer(createContainerState())
//console.log()


let oArray = [
    {
        name:'Fuck',
        dif:{
            length:4,
            mean:'Fuck you!'
        },
        oneLevelNum:6
    },
    {
        name:'Shit',
        dif:{
            length:4,
            mean:'Shit you!'
        },
        oneLevelNum:8
    }
]


let testLinkedList = new LinkedList()
testLinkedList.insertLast(controllerUnitState[0])
testLinkedList.insertLast(controllerUnitState[1])
testLinkedList.insertLast(controllerUnitState[2])

//testLinkedList.shiftToLast(0)
console.log('testLinkedList :')
testLinkedList.printList()

let cloneList = testLinkedList.cloneList()

console.log('cloneList :')
console.log(cloneList)


