
class LinkedListNode {
    constructor(data, next=null, index=null){
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
        
        // Index Over Range, stop the function
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

        return null
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



export default LinkedList