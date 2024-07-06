import * as React from "react";
import { Select, MenuItem, Button } from "@mui/material";
import { useAuth } from "@/middleware/AuthenticationProviders";
import { database } from "../../firebaseConfig";
import { ref, onValue, get, push, set } from "firebase/database";
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

interface LogData {
  key: string;
  uid: string;
  displayName: string;
  timestamp: number;
  activity: string;
}

export default function LogActivity() {
  const auth = useAuth(); // Get the current user from the useAuth hook

  const [logAktivitasMember, setAktivitasMember] = useState<LogData[]>([]);

  const logAktivitas = (activity: string) => {
    const logRef = ref(database, "Log_Aktivitas_Member");
    const newLogRef = push(logRef);
    set(newLogRef, {
      uid: auth?.uid,
      displayName: auth?.displayName ?? "",
      timestamp: Date.now(),
      activity: activity,
    });
  };

  const handleControlUpdate = (controlName: string) => {
    const controlRef = ref(database, `Kontrol_Panel/${controlName}`);
    let lastValue: any = null;
    onValue(controlRef, (snapshot) => {
      const newValue = snapshot.val();
      if (newValue !== lastValue) {
        lastValue = newValue;
        logAktivitas(`Mengubah ${controlName} ke ${newValue ? "Hidup" : "Mati" }`);
      }
    });
  };

  useEffect(() => {
    if (!auth) return;
    handleControlUpdate("Misting Pestisida");
    handleControlUpdate("Misting Pupuk Daun");
    handleControlUpdate("Pelindung Hama");
    handleControlUpdate("Pemasukan ke Kontainer");
    handleControlUpdate("Pembuangan Pipa Hidroponik");
    handleControlUpdate("Pembuangan ke Kontainer");
    handleControlUpdate("Pengaduk Larutan");
    handleControlUpdate("Pompa Utama");
  }, [auth]);

  useEffect(() => {
    if (!auth) return;
    const logRef = ref(database, "Log_Aktivitas_Member");
    const unsubscribe = onValue(logRef, (snapshot) => {
      const logsData = snapshot.val() || {};
      const logsList = Object.entries(logsData).map(([key, log]) => {
        const logEntry = log as {
          uid: string;
          displayName: string;
          timestamp: number;
          activity: string;
        };
        return {
          key,
          uid: logEntry.uid,
          displayName: logEntry.displayName,
          timestamp: logEntry.timestamp,
          activity: logEntry.activity,
        };
      });
      setAktivitasMember(logsList.reverse());
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const [pageListLog, setPageListLog] = useState(1);
  const rowsPerPageListLog = 5;
  const pagesListLog = Math.ceil(logAktivitasMember.length / rowsPerPageListLog);
  const paginatedListLog = React.useMemo(() => {
    const start = (pageListLog - 1) * rowsPerPageListLog;
    const end = start + rowsPerPageListLog;
    return logAktivitasMember.slice(start, end);
  }, [pageListLog, logAktivitasMember]);

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
            <TableRow key={log.key}>
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
