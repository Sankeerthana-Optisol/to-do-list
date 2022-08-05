
import AddTask from './component/addTask.js'
import TaskList from './component/taskList.js'

/**
 * Instantiating classes to render components of the following templates,
 * Add task, Task list (Active and completed)
 */
new AddTask()
new TaskList('Active')
new TaskList('Completed')