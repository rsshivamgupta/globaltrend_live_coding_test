function dijkstra(graph, source) {
    const distances = {};
    const visited = new Set();
    const priorityQueue = new MinPriorityQueue();
    
    for (const vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[source] = 0;
    priorityQueue.enqueue(source, 0);

    while (!priorityQueue.isEmpty()) {
        const { element: currentVertex, priority: currentDistance } = priorityQueue.dequeue();

        if (visited.has(currentVertex)) continue;
        visited.add(currentVertex);

        for (const neighbor in graph[currentVertex]) {
            const distance = graph[currentVertex][neighbor];
            const newDistance = currentDistance + distance;

            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                priorityQueue.enqueue(neighbor, newDistance);
            }
        }
    }

    return distances;
}

class MinPriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}


const graph = {
    0: { 1: 4, 2: 1 },
    1: { 3: 1 },
    2: { 1: 2, 3: 5 },
    3: {}
};
const source = 0;
console.log(dijkstra(graph, source)); 

// Output: { '0': 0, '1': 3, '2': 1, '3': 4 }
