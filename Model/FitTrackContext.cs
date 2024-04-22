using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FitTrack.Model;

public partial class FitTrackContext : DbContext
{
    public FitTrackContext()
    {
    }

    public FitTrackContext(DbContextOptions<FitTrackContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Services.ActivityType> ActivityTypes { get; set; }

    public virtual DbSet<Services.FitnessActivity> FitnessActivities { get; set; }

    public virtual DbSet<Services.GoalType> GoalTypes { get; set; }

    public virtual DbSet<Services.User> Users { get; set; }

    public virtual DbSet<Services.UserSetting> UserSettings { get; set; }

    /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost, 1401;Database=FitTrack;User=sa;Password=yourStrong(!)Password;ConnectRetryCount=0;TrustServerCertificate=True;MultipleActiveResultSets=true;");
    */
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Services.ActivityType>(entity =>
        {
            entity.HasKey(e => e.ActivityTypeId).HasName("PK__Activity__95CEDE6E9CFBEC45");

            entity.ToTable("ActivityType");

            entity.Property(e => e.ActivityTypeId).HasColumnName("ActivityTypeID");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Services.FitnessActivity>(entity =>
        {
            entity.HasKey(e => e.FitnessActivityId).HasName("PK__FitnessA__4875C5540B46923F");

            entity.ToTable("FitnessActivity");

            entity.Property(e => e.FitnessActivityId).HasColumnName("FitnessActivityID");
            entity.Property(e => e.ActivityTypeId).HasColumnName("ActivityTypeID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.ActivityType).WithMany(p => p.FitnessActivities)
                .HasForeignKey(d => d.ActivityTypeId)
                .HasConstraintName("FK__FitnessAc__Activ__403A8C7D");

            entity.HasOne(d => d.User).WithMany(p => p.FitnessActivities)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__FitnessAc__UserI__412EB0B6");
        });

        modelBuilder.Entity<Services.GoalType>(entity =>
        {
            entity.HasKey(e => e.GoalTypeId).HasName("PK__GoalType__20722CF271A1E657");

            entity.ToTable("GoalType");

            entity.Property(e => e.GoalTypeId).HasColumnName("GoalTypeID");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Services.User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CCAC287031E4");

            entity.ToTable("User");

            entity.HasIndex(e => e.Username, "UQ__User__536C85E4ADF5561C").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__User__A9D1053447EE4D84").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Services.UserSetting>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__UserSett__1788CCAC3B592AE5");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("UserID");
            entity.Property(e => e.GoalTypeId).HasColumnName("GoalTypeID");

            entity.HasOne(d => d.GoalType).WithMany(p => p.UserSettings)
                .HasForeignKey(d => d.GoalTypeId)
                .HasConstraintName("FK__UserSetti__GoalT__4222D4EF");

            /*entity.HasOne(d => d.User).WithOne(p => p.UserSetting)
                .HasForeignKey<UserSetting>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserSetti__UserI__4316F928");*/
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
