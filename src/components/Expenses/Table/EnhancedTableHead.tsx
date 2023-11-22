import { TableHead, TableCell, TableRow, Checkbox } from "@mui/material";

interface EnhancedTableHeadProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all expenses",
                        }}
                    />
                </TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Sum</TableCell>
                <TableCell align="right">Date</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default EnhancedTableHead;
