import React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import {Card, TableCell, TableHead} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";

const KetStats = ({ data }) => {
    return (
        <Card style={{ width: "50%" }}>
            <TableContainer>
                <Table>
                    <TableBody>
                        {
                            data.map(col =>
                                <TableRow>
                                    {
                                        col.map(row => <TableCell>{row}</TableCell>)
                                    }
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>

    );
};

export default KetStats;