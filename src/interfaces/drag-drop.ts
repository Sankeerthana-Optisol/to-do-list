/* interfaces for draggable items and drop to a target */
export interface Draggable{
    dragStartHandler(event: DragEvent): void
    dragEndHandler(event: DragEvent): void
  }
  
export interface DragTarget{
    dragOverHandler(event: DragEvent): void
    drophandler(event: DragEvent): void
    dragLeaveHandler(event: DragEvent): void
  }