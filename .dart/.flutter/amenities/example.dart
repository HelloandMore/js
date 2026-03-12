import 'package:flutter/material.dart';

class AlertDrawerBottomNavBarDismissable extends StatefulWidget {
  const AlertDrawerBottomNavBarDismissable({super.key});

  @override
  State<AlertDrawerBottomNavBarDismissable> createState() {
    return _AlertDrawerBottomNavBarDismissableState();
  }
}

class _AlertDrawerBottomNavBarDismissableState
    extends State<AlertDrawerBottomNavBarDismissable> {
  final _formKey = GlobalKey<FormState>();
  List<String> todos = ['Joging', 'Gym', 'School'];
  final _todoController = TextEditingController();
  String currentTodo = '';
  String _currentPage = 'add-todo-item';
  int _selectedIndex = 0;
  Map<int, String> bottomNavBarItems = {0: 'add-todo-item', 1: 'todo-list'};

  @override
  void dispose() {
    _todoController.dispose();
    super.dispose();
  }

  void _onBottomNavBarTapped(int index) {
    _selectedIndex = index;
    setState(() {
      _currentPage = bottomNavBarItems[index]!;
    });
  }

  void undoOperation(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Undo operation'),
          content: Text('You kept the todo item.'),
          actions: [
            TextButton(
              child: Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      endDrawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 217, 207, 58),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Menu'),
                  IconButton(
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                    icon: Icon(Icons.close),
                  ),
                ],
              ),
            ),
            ListTile(
              leading: Icon(Icons.edit),
              title: Text('New todo'),
              onTap: () {
                _selectedIndex = 0;
                setState(() {
                  _currentPage = 'add-todo-item';
                });
                Navigator.of(context).pop();
              },
            ),
            ListTile(
              leading: Icon(Icons.format_list_bulleted),
              title: Text('Todo list'),
              onTap: () {
                _selectedIndex = 1;
                setState(() {
                  _currentPage = 'todo-list';
                });
                Navigator.of(context).pop();
              },
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        backgroundColor:
            Colors.amberAccent, // BottomNavigationBar background color
        selectedItemColor: Colors.white, // Selected item color
        unselectedItemColor: Colors.teal, // Unselected item color
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.edit), label: 'Add todo'),
          BottomNavigationBarItem(
            icon: Icon(Icons.format_list_bulleted),
            label: 'Todos',
          ),
        ],
        currentIndex: _selectedIndex,
        onTap: _onBottomNavBarTapped,
      ),
      appBar: AppBar(
        title: Text('Useful Widgets'),
        backgroundColor: Colors.amberAccent,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: _currentPage == 'add-todo-item'
            ? Column(
                children: [
                  Form(
                    key: _formKey,
                    child: Row(
                      children: [
                        Expanded(
                          child: TextFormField(
                            controller: _todoController,
                            keyboardType: TextInputType.text,
                            decoration: InputDecoration(label: Text('Todo')),
                            validator: (value) {
                              if (value == null || value.trim().isEmpty) {
                                return 'Please enter a todo';
                              }
                              return null;
                            },
                            autofocus: true,
                          ),
                        ),

                        SizedBox(width: 20),
                        ElevatedButton.icon(
                          onPressed: () {
                            if (_formKey.currentState!.validate()) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Todo added to list'),
                                  showCloseIcon: true,
                                ),
                              );
                              setState(() {
                                todos.add(_todoController.text);
                              });
                              _todoController.text = '';
                            }
                          },
                          label: Text('Save'),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 8),
                ],
              )
            : Column(
                children: [
                  SizedBox(
                    height: 300,
                    child: ListView.builder(
                      itemCount: todos.length,
                      itemBuilder: (BuildContext context, int index) =>
                          Dismissible(
                            key: ValueKey(todos[index]),
                            onDismissed: (direction) {
                              currentTodo = todos[index];
                              setState(() {
                                todos.removeAt(index);
                              });
                              ScaffoldMessenger.of(context).clearSnackBars();
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Todo deleted'),
                                  showCloseIcon: true,
                                  action: SnackBarAction(
                                    label: 'Undo',
                                    onPressed: () {
                                      setState(() {
                                        todos.insert(index, currentTodo);
                                      });
                                      undoOperation(context);
                                    },
                                  ),
                                ),
                              );
                            },
                            child: Card(
                              color: const Color.fromARGB(255, 225, 214, 180),
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 20,
                                  vertical: 16,
                                ),
                                child: Text(todos[index]),
                              ),
                            ),
                          ),
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}
