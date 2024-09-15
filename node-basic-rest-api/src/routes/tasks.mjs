import express from "express";
const router = express.Router();

// Sample data (tasks)
let tasks = [
  {
    id: '0',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI.',
    price: 29.99,
    image: '/Imagenes/mouseinalambrico.webp',
  },
  {
    id: '1',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with Cherry MX switches.',
    price: 89.99,
    image: '/Imagenes/mech.keyboard.jpeg',
  },
  {
    id: '2',
    name: 'Gaming Headset',
    description: 'Surround sound gaming headset with noise-cancelling microphone.',
    price: 59.99,
    image: '/Imagenes/headset.jpeg',
  },
  {
    id: '3',
    name: '27-inch Monitor',
    description: '4K UHD monitor with IPS display and 144Hz refresh rate.',
    price: 329.99,
    image: '/Imagenes/monitor.jpeg',
  },
  {
    id: '4',
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand for ergonomic work setup.',
    price: 39.99,
    image: '/Imagenes/laptop.stand.jpg',
  },
  {
    id: '5',
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
    price: 24.99,
    image: '/Imagenes/usbchub.jpeg',
  },
  {
    id: '6',
    name: 'External SSD',
    description: 'Portable external SSD with 1TB storage and USB 3.1 interface.',
    price: 129.99,
    image: '/Imagenes/ssd.jpg',
  },
  {
    id: '7',
    name: 'Smartphone Stand',
    description: 'Adjustable smartphone stand with 360-degree rotation.',
    price: 19.99,
    image: '/Imagenes/phonestand.jpeg',
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 10-hour battery life.',
    price: 49.99,
    image: '/Imagenes/btspeaker.jpeg',
  },
  {
    id: '9',
    name: 'Webcam',
    description: '1080p HD webcam with built-in microphone and privacy cover.',
    price: 34.99,
    image: '/Imagenes/webcam.jpg',
  },
  {
    id: '10',
    name: 'Wireless Charger',
    description: 'Fast wireless charger with Qi compatibility.',
    price: 25.99,
    image: '/Imagenes/wirelesscharg.webp',
  },
  {
    id: '11',
    name: 'Noise-Cancelling Headphones',
    description: 'Over-ear noise-cancelling headphones with Bluetooth connectivity.',
    price: 199.99,
    image: '/Imagenes/noisecanc.headphones.jpeg',
  },
  {
    id: '12',
    name: 'Smartwatch',
    description: 'Smartwatch with heart rate monitor and GPS.',
    price: 149.99,
    image: '/Imagenes/smartwatch.jpg',
  },
];

// GET all tasks
router.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST a new task
router.post("/tasks", (req, res) => {
  const task = req.body;
  task.id = (tasks.length + 1).toString();
  tasks.push(task);
  res.status(201).json(task);
});

// DELETE a task by ID
router.delete("/tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  
  tasks = tasks.filter((task) => task.id !== taskId);
  
  res.sendStatus(204);
});

// PUT (update) a task by ID
router.put("/tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;

  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, ...updatedTask, id: taskId };
    }
    return task;
  });

  res.json(tasks.find((task) => task.id === taskId));
});

export default router;
