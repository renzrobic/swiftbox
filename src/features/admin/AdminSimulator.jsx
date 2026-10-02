import React, { useState, useEffect, useCallback } from 'react';
import { 
  Cpu, Radio, Unlock, Lock, RefreshCw, Power, 
  AlertTriangle, CheckCircle2, Activity, Wifi, WifiOff,
  DoorOpen, DoorClosed
} from 'lucide-react';
import { api } from '../../services/api';

const DEFAULT_COMPARTMENTS = {
  L01: {
    id: 'L01',
    hardwareStatus: 'ONLINE',
    doorState: 'CLOSED',
    doorSensor: 'CLOSED',
    doorCommand: 'IDLE',
    relayEngaged: false,
    lastHeartbeat: new Date().toISOString()
  },
  L02: {
    id: 'L02',
    hardwareStatus: 'ONLINE',
    doorState: 'CLOSED',
    doorSensor: 'CLOSED',
    doorCommand: 'IDLE',
    relayEngaged: false,
    lastHeartbeat: new Date().toISOString()
  },
  L03: {
    id: 'L03',
    hardwareStatus: 'ONLINE',
    doorState: 'CLOSED',
    doorSensor: 'CLOSED',
    doorCommand: 'IDLE',
    relayEngaged: false,
    lastHeartbeat: new Date().toISOString()
  }
};

export default function AdminSimulator() {
  const [compartments, setCompartments] = useState(DEFAULT_COMPARTMENTS);
  const [loading, setLoading] = useState(false);
  const [actionNotice, setActionNotice] = useState(null);

  const fetchState = useCallback(async () => {
    try {
      const res = await api.get('/api/v1/simulator/state');
      if (res && res.compartments) {
        setCompartments(res.compartments);
      }
    } catch (err) {
      // In local dev without backend simulator running, graceful local fallback
      console.debug("Simulator fetch notice:", err.message);
    }
  }, []);

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 3000);
    return () => clearInterval(interval);
  }, [fetchState]);

  const showFeedback = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleSimulateUnlock = async (lockerId) => {
    setLoading(true);
    try {
      await api.post('/api/v1/simulator/unlock', { lockerId });
      showFeedback(`⚡ Relay pulsed on ${lockerId}. Solenoid activated -> Door popped OPEN.`);
      await fetchState();
    } catch (err) {
      // Local optimistic update
      setCompartments(prev => ({
        ...prev,
        [lockerId]: {
          ...prev[lockerId],
          doorState: 'OPEN',
          doorSensor: 'OPEN',
          doorCommand: 'UNLOCKED'
        }
      }));
      showFeedback(`⚡ Relay simulated on ${lockerId} (local): Door popped OPEN.`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDoor = async (lockerId) => {
    setLoading(true);
    try {
      await api.post('/api/v1/simulator/open-door', { lockerId });
      showFeedback(`🚪 Locker ${lockerId} door physically OPENED. Reed switch disengaged.`);
      await fetchState();
    } catch (err) {
      setCompartments(prev => ({
        ...prev,
        [lockerId]: {
          ...prev[lockerId],
          doorState: 'OPEN',
          doorSensor: 'OPEN'
        }
      }));
      showFeedback(`🚪 Locker ${lockerId} door OPENED (local).`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDoor = async (lockerId) => {
    setLoading(true);
    try {
      await api.post('/api/v1/simulator/close-door', { lockerId });
      showFeedback(`🔒 Locker ${lockerId} door CLOSED. Reed switch engaged. Command reset to IDLE.`);
      await fetchState();
    } catch (err) {
      setCompartments(prev => ({
        ...prev,
        [lockerId]: {
          ...prev[lockerId],
          doorState: 'CLOSED',
          doorSensor: 'CLOSED',
          doorCommand: 'IDLE'
        }
      }));
      showFeedback(`🔒 Locker ${lockerId} door CLOSED (local). Command IDLE.`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetLocker = async (lockerId) => {
    setLoading(true);
    try {
      await api.post('/api/v1/simulator/reset', { lockerId });
      showFeedback(`🔄 Locker ${lockerId} reset to factory defaults.`);
      await fetchState();
    } catch (err) {
      setCompartments(prev => ({
        ...prev,
        [lockerId]: {
          id: lockerId,
          hardwareStatus: 'ONLINE',
          doorState: 'CLOSED',
          doorSensor: 'CLOSED',
          doorCommand: 'IDLE',
          relayEngaged: false,
          lastHeartbeat: new Date().toISOString()
        }
      }));
      showFeedback(`🔄 Locker ${lockerId} reset (local).`);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleOnline = async (lockerId) => {
    const current = compartments[lockerId]?.hardwareStatus;
    const newStatus = current === 'ONLINE' ? 'OFFLINE' : 'ONLINE';
    setLoading(true);
    try {
      await api.post('/api/v1/simulator/status', { lockerId, status: newStatus });
      showFeedback(`📶 Compartment ${lockerId} set to ${newStatus}.`);
      await fetchState();
    } catch (err) {
      setCompartments(prev => ({
        ...prev,
        [lockerId]: {
          ...prev[lockerId],
          hardwareStatus: newStatus
        }
      }));
      showFeedback(`📶 Compartment ${lockerId} set to ${newStatus} (local).`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 overflow-hidden pb-12 text-left">
      {/* Simulation Banner */}
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={18} />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
              HARDWARE SIMULATION / DEMO MODE
            </h4>
            <p className="mt-1 text-[11px] leading-relaxed text-amber-700">
              <strong>Notice:</strong> Physical hardware (ESP32 DevKit, optocoupled relays, 12V solenoids, magnetic reed switches) has not been commissioned yet.
              This interactive dashboard accurately simulates the ESP32 firmware state machine and Firebase RTDB telemetry contract.
            </p>
          </div>
        </div>
      </div>

      {/* Action Notification */}
      {actionNotice && (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 shadow-sm transition-all animate-pulse">
          {actionNotice}
        </div>
      )}

      {/* Compartments Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Object.keys(compartments).map((lockerId) => {
          const comp = compartments[lockerId];
          const isOnline = comp.hardwareStatus === 'ONLINE';
          const isDoorOpen = comp.doorState === 'OPEN';
          const isSensorOpen = comp.doorSensor === 'OPEN';
          const isPending = comp.doorCommand === 'PENDING_UNLOCK' || comp.doorCommand === 'UNLOCKING';
          const isUnlocked = comp.doorCommand === 'UNLOCKED';

          return (
            <div 
              key={lockerId}
              className={`rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                isOnline ? 'border-ink/10' : 'border-red-200 bg-red-50/20'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-ink/5 pb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="text-ink" size={18} />
                  <h3 className="text-lg font-bold tracking-tight text-ink">
                    Locker {lockerId}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <span 
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider ${
                      isOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {isOnline ? <Wifi size={10} /> : <WifiOff size={10} />}
                    {comp.hardwareStatus}
                  </span>
                </div>
              </div>

              {/* Status Grid */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-ink/5 bg-pearl/40 p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-ink/60">
                    Physical Door
                  </p>
                  <p className={`mt-1 flex items-center gap-1.5 text-sm font-bold ${
                    isDoorOpen ? 'text-amber-600' : 'text-emerald-700'
                  }`}>
                    {isDoorOpen ? <DoorOpen size={14} /> : <DoorClosed size={14} />}
                    {comp.doorState}
                  </p>
                </div>

                <div className="rounded-xl border border-ink/5 bg-pearl/40 p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-ink/60">
                    Reed Sensor
                  </p>
                  <p className={`mt-1 flex items-center gap-1.5 text-sm font-bold ${
                    isSensorOpen ? 'text-amber-600' : 'text-emerald-700'
                  }`}>
                    <Activity size={14} />
                    {comp.doorSensor}
                  </p>
                </div>

                <div className="col-span-2 rounded-xl border border-ink/5 bg-pearl/40 p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-ink/60">
                    Door Command
                  </p>
                  <p className={`mt-1 flex items-center gap-1.5 text-xs font-mono font-bold ${
                    isPending ? 'text-blue-600 animate-pulse' : isUnlocked ? 'text-emerald-600' : 'text-ink/80'
                  }`}>
                    {comp.doorCommand}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => handleSimulateUnlock(lockerId)}
                  disabled={loading || !isOnline}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-ink/90 active:scale-98 disabled:opacity-50"
                >
                  <Unlock size={14} />
                  Simulate Unlock (1000ms Pulse)
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenDoor(lockerId)}
                    disabled={loading || !isOnline || isDoorOpen}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-ink/10 bg-white px-3 py-2 text-[11px] font-semibold text-ink transition-all hover:bg-pearl disabled:opacity-40"
                  >
                    <DoorOpen size={13} />
                    Open Door
                  </button>

                  <button
                    onClick={() => handleCloseDoor(lockerId)}
                    disabled={loading || !isOnline || !isDoorOpen}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-ink/10 bg-white px-3 py-2 text-[11px] font-semibold text-ink transition-all hover:bg-pearl disabled:opacity-40"
                  >
                    <DoorClosed size={13} />
                    Close Door
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-ink/5">
                  <button
                    onClick={() => handleToggleOnline(lockerId)}
                    disabled={loading}
                    className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-semibold transition-all ${
                      isOnline 
                        ? 'border-red-200 text-red-600 hover:bg-red-50' 
                        : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Power size={11} />
                    {isOnline ? 'Set Offline' : 'Set Online'}
                  </button>

                  <button
                    onClick={() => handleResetLocker(lockerId)}
                    disabled={loading}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-[10px] font-semibold text-ink/70 hover:bg-pearl hover:text-ink"
                  >
                    <RefreshCw size={11} />
                    Reset Locker
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
