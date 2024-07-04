import * as React from "react";
import { Select, MenuItem, Button } from "@mui/material";
import { useAuth } from "@/middleware/AuthenticationProviders";
import { database } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/SearchIcon";

interface LogEntry {
  uid: string;
  displayName: string;
  timestamp: number;
  activity: string;
}

export default function LogActivity() {
  const auth = useAuth(); // Get the current user from the useAuth hook
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const kontrolPanelRef = ref(database, "Kontrol_Panel");

  useEffect(() => {
    if (auth) { // Add a null check
      onValue(kontrolPanelRef, (snapshot) => {
        const updates = snapshot.val();
        const logEntries: LogEntry[] = Object.entries(updates).map(([key, value]) => {
          return {
            uid: auth.uid, // Use the current user's UID
            displayName: auth.displayName?? "Unkown", // Use the current user's display name
            timestamp: Date.now(), // Use the current timestamp
            activity: `${key} was updated to ${value ? 'hidup' : 'mati'}`,
          };
        });
        setLogs((prevLogs) => [...prevLogs, ...logEntries]);
      });
    }
  }, [auth]);

  const [pageListLog, setPageListLog] = useState(1);
  const rowsPerPageListLog = 5;
  const pagesListLog = Math.ceil(logs.length / rowsPerPageListLog);
  const paginatedListLog = React.useMemo(() => {
    const start = (pageListLog - 1) * rowsPerPageListLog;
    const end = start + rowsPerPageListLog;
    return logs.slice(start, end);
  }, [pageListLog, logs]);

  return (
    <>
      <Table
        aria-label="Log Aktivitas"
        radius="none"
        topContent={
          <div className="flex flex-row font-bold justify-between items-center">
            <p>Log Aktivitas:</p>
          </div>
        }
        color="default"
        className="overflow-auto rounded-lg"
      >
        <TableHeader>
          <TableColumn>NO</TableColumn>
          <TableColumn>NAMA</TableColumn>
          <TableColumn>WAKTU</TableColumn>
          <TableColumn>AKTIVITAS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"Tidak ada log aktivitas."}>
          {paginatedListLog.map((log, index) => (
            <TableRow key={log.timestamp}>
              <TableCell>
                {(pageListLog - 1) * rowsPerPageListLog + index + 1}
              </TableCell>
              <TableCell>{log.displayName}</TableCell>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell>{log.activity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mb-4">
        <Pagination
          isCompact
          size="sm"
          showControls
          color="success"
          variant="flat"
          total={pagesListLog}
          initialPage={pageListLog}
          page={pageListLog}
          onChange={(page) => setPageListLog(page)}
        />
      </div>
    </>
  );
}