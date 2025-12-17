# 🚨 緊急應變手冊

## 🔥 事故處理流程

### 事故分級
| 級別 | 定義 | 回應時間 | 範例 |
|------|------|---------|-------|
| P0 🔴 | 系統完全癱瘓 | 立即 | 資料庫崩潰、完全無法訪問 |
| P1 🟠 | 主要功能受損 | 15 分鐘 | 登入失敗、支付中斷 |
| P2 🟡 | 次要功能異常 | 1 小時 | 報表錯誤、通知延遲 |
| P3 🟢 | 輕微問題 | 4 小時 | UI 顯示問題、非關鍵 bug |

### 事故響應團隊
```yaml
On-Call Schedule:
  Primary: @engineer-1 (手機: XXX-XXXX)
  Secondary: @engineer-2 (手機: XXX-XXXX)
  Manager: @manager (手機: XXX-XXXX)

Escalation Path:
  L1: On-Call Engineer (0-15 min)
  L2: Team Lead (15-30 min)
  L3: Engineering Manager (30-60 min)
  L4: CTO (60+ min)
```

---

## 🚑 常見事故處理

### 1. 🔴 服務完全無法訪問

#### 檢查步驟
```bash
# 1. 檢查服務狀態
systemctl status app-service
docker ps -a

# 2. 檢查負載均衡器
curl -I https://load-balancer.example.com/health

# 3. 檢查 DNS
nslookup api.example.com
dig api.example.com

# 4. 檢查網路連接
ping api.example.com
traceroute api.example.com
```

#### 恢復步驟
```bash
# Option 1: 重啟服務
sudo systemctl restart app-service

# Option 2: 重啟容器
docker-compose down
docker-compose up -d

# Option 3: 切換到備援
./scripts/failover-to-backup.sh

# Option 4: 回滾部署
./scripts/rollback-deployment.sh
```

---

### 2. 💾 資料庫問題

#### 連線失敗
```bash
# 檢查資料庫狀態
sudo systemctl status postgresql
psql -h localhost -U admin -d database_name -c "SELECT 1;"

# 檢查連線數
psql -c "SELECT count(*) FROM pg_stat_activity;"

# 殺死阻塞查詢
psql -c "SELECT pg_terminate_backend(pid)
         FROM pg_stat_activity
         WHERE state = 'active'
         AND query_start < NOW() - INTERVAL '10 minutes';"
```

#### 效能問題
```sql
-- 找出慢查詢
SELECT
  query,
  calls,
  mean_exec_time,
  total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- 檢查索引使用
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read
FROM pg_stat_user_indexes
ORDER BY idx_scan;

-- 查看鎖定情況
SELECT
  pid,
  usename,
  query,
  state,
  wait_event_type,
  wait_event
FROM pg_stat_activity
WHERE state != 'idle';
```

#### 緊急恢復
```bash
# 從備份恢復
pg_restore -h localhost -U postgres -d database_name backup.dump

# Point-in-time recovery
pg_basebackup -h backup-server -D /recovery/data
```

---

### 3. 🔥 高負載 / 流量激增

#### 診斷
```bash
# CPU 和記憶體使用
top -b -n 1
htop
vmstat 1

# 網路連線
netstat -an | grep ESTABLISHED | wc -l
ss -s

# 應用程式指標
curl http://localhost:9090/metrics
```

#### 緩解措施
```bash
# 1. 啟用 Rate Limiting
redis-cli SET rate_limit:global 100

# 2. 擴展服務
kubectl scale deployment api-server --replicas=10

# 3. 啟用快取
redis-cli CONFIG SET maxmemory 2gb
redis-cli CONFIG SET maxmemory-policy allkeys-lru

# 4. 啟用 CDN
./scripts/enable-cdn-cache.sh

# 5. 降級服務（關閉非核心功能）
curl -X POST http://api/admin/feature-flags \
  -d '{"heavyFeature": false}'
```

---

### 4. 🔐 安全事件

#### 可疑活動偵測
```bash
# 檢查異常登入
grep "Failed password" /var/log/auth.log | tail -50

# 檢查異常流量
iptables -L -n -v | grep DROP

# 檢查檔案變更
find /app -type f -mtime -1 -ls

# 檢查異常進程
ps aux | grep -v "^USER" | awk '{print $11}' | sort | uniq -c | sort -rn
```

#### 立即回應
```bash
# 1. 隔離受影響系統
iptables -I INPUT -s suspicious_ip -j DROP

# 2. 撤銷可疑 token
redis-cli DEL session:*

# 3. 重置所有密碼
./scripts/force-password-reset.sh

# 4. 啟用額外日誌
export LOG_LEVEL=DEBUG
systemctl restart app-service
```

---

## 🔄 部署問題

### 部署回滾
```bash
# 查看部署歷史
kubectl rollout history deployment/app

# 回滾到上一版本
kubectl rollout undo deployment/app

# 回滾到特定版本
kubectl rollout undo deployment/app --to-revision=3

# Docker 回滾
docker tag app:current app:rollback
docker tag app:previous app:current
docker-compose up -d
```

### Blue-Green 切換
```bash
# 檢查 Green 環境
curl http://green.internal/health

# 切換流量
./scripts/switch-to-green.sh

# 驗證切換
curl http://api.example.com/version

# 如需回滾
./scripts/switch-to-blue.sh
```

---

## 📞 緊急聯絡

### 內部團隊
| 角色 | 姓名 | 電話 | Email | Slack |
|------|------|------|-------|-------|
| On-Call Lead | John Doe | +1-XXX-XXX | john@example.com | @john |
| DBA | Jane Smith | +1-XXX-XXX | jane@example.com | @jane |
| Security | Bob Wilson | +1-XXX-XXX | bob@example.com | @bob |
| DevOps | Alice Brown | +1-XXX-XXX | alice@example.com | @alice |

### 外部廠商
| 服務 | 聯絡方式 | 帳號 ID |
|------|---------|---------|
| AWS Support | +1-800-XXX | 123456789 |
| Cloudflare | support@cloudflare | CF-XXX |
| DataDog | +1-866-XXX | DD-XXX |

---

## 📋 檢查清單

### 事故發生時
- [ ] 確認事故級別 (P0/P1/P2/P3)
- [ ] 通知相關人員
- [ ] 建立事故頻道 (Slack: #incident-YYYYMMDD)
- [ ] 開始記錄時間軸
- [ ] 執行初步診斷
- [ ] 實施緩解措施
- [ ] 持續溝通更新

### 事故解決後
- [ ] 確認服務完全恢復
- [ ] 監控關鍵指標 30 分鐘
- [ ] 發布事故報告
- [ ] 排程事後檢討會議
- [ ] 更新 Runbook
- [ ] 實施預防措施

---

## 🔧 診斷工具

### 系統健康檢查
```bash
#!/bin/bash
# health-check.sh

echo "=== System Health Check ==="

# Service Status
echo "1. Service Status:"
systemctl status app-service | head -5

# Database Connection
echo "2. Database:"
psql -c "SELECT 'Database OK';" 2>/dev/null || echo "Database ERROR"

# Redis
echo "3. Redis:"
redis-cli ping || echo "Redis ERROR"

# Disk Usage
echo "4. Disk Usage:"
df -h | grep -E "^/dev/"

# Memory
echo "5. Memory:"
free -h

# Load Average
echo "6. Load:"
uptime

# Recent Errors
echo "7. Recent Errors:"
tail -20 /var/log/app/error.log | grep ERROR
```

### 效能分析
```bash
#!/bin/bash
# performance-check.sh

# API Response Time
echo "API Response Time:"
for i in {1..5}; do
  curl -w "@curl-format.txt" -o /dev/null -s http://api/health
done

# Database Query Time
echo "Database Query Time:"
psql -c "EXPLAIN ANALYZE SELECT COUNT(*) FROM users;"

# Cache Hit Rate
echo "Cache Hit Rate:"
redis-cli INFO stats | grep keyspace
```

---

## 📝 事故報告模板

```markdown
# Incident Report: [INC-YYYYMMDD-XXX]

## Summary
- **Date/Time**: YYYY-MM-DD HH:MM (Timezone)
- **Duration**: XX minutes
- **Severity**: P0/P1/P2/P3
- **Impact**: [Number of users affected, services impacted]

## Timeline
- HH:MM - Issue detected
- HH:MM - Team notified
- HH:MM - Root cause identified
- HH:MM - Fix deployed
- HH:MM - Service restored
- HH:MM - Monitoring confirmed stable

## Root Cause
[Detailed explanation of what caused the incident]

## Resolution
[Steps taken to resolve the issue]

## Lessons Learned
1. What went well
2. What could be improved
3. Action items

## Prevention Measures
- [ ] [Specific action to prevent recurrence]
- [ ] [Update monitoring]
- [ ] [Update documentation]
```

---

## 🔄 定期演練

### 月度演練計劃
- 第一週: 資料庫故障演練
- 第二週: 高負載壓力測試
- 第三週: 安全事件響應
- 第四週: 完整災難恢復

### 演練檢查項目
- [ ] 所有 On-Call 人員參與
- [ ] 記錄響應時間
- [ ] 識別改進點
- [ ] 更新 Runbook
- [ ] 分享經驗教訓

---

**最後更新**: 2024-12-17
**下次審查**: 2025-01-17
**負責人**: DevOps Team