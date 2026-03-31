import 'package:flutter/material.dart';

class SudokuBoard extends StatefulWidget {
  final List<List<int?>> puzzle;
  final List<List<bool>> fixed;
  final void Function(List<List<int?>>) onChanged;

  const SudokuBoard({
    super.key,
    required this.puzzle,
    required this.fixed,
    required this.onChanged,
  });

  @override
  State<SudokuBoard> createState() => _SudokuBoardState();
}

class _SudokuBoardState extends State<SudokuBoard> {
  late List<List<int?>> board;

  @override
  void initState() {
    super.initState();
    board = widget.puzzle.map((row) => List<int?>.from(row)).toList();
  }

  Widget _buildCell(int row, int col) {
    final value = board[row][col];
    final isFixed = widget.fixed[row][col];
    return Container(
      margin: EdgeInsets.all(1),
      decoration: BoxDecoration(
        border: Border.all(
          color: Colors.black,
          width:
              (row % 3 == 2 && row != 8 ? 2 : 1) +
              (col % 3 == 2 && col != 8 ? 2 : 1) -
              1,
        ),
        color: isFixed ? Colors.grey[300] : Colors.white,
      ),
      width: 36,
      height: 36,
      child: Center(
        child: isFixed
            ? Text(
                value?.toString() ?? '',
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
              )
            : TextField(
                textAlign: TextAlign.center,
                keyboardType: TextInputType.number,
                maxLength: 1,
                style: const TextStyle(fontSize: 18),
                decoration: const InputDecoration(
                  border: InputBorder.none,
                  counterText: '',
                ),
                controller: TextEditingController(
                  text: value == null ? '' : value.toString(),
                ),
                onChanged: (text) {
                  final n = int.tryParse(text);
                  setState(() {
                    board[row][col] = (n != null && n >= 1 && n <= 9)
                        ? n
                        : null;
                  });
                  widget.onChanged(board);
                },
              ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (int row = 0; row < 9; row++)
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [for (int col = 0; col < 9; col++) _buildCell(row, col)],
          ),
      ],
    );
  }
}
