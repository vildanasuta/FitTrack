USE [master]
GO
/****** Object:  Database [FitTrack]    Script Date: 27/04/2024 12:48:15 ******/
CREATE DATABASE [FitTrack]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FitTrack', FILENAME = N'/var/opt/mssql/data/FitTrack.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FitTrack_log', FILENAME = N'/var/opt/mssql/data/FitTrack_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [FitTrack] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FitTrack].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FitTrack] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FitTrack] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FitTrack] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FitTrack] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FitTrack] SET ARITHABORT OFF 
GO
ALTER DATABASE [FitTrack] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FitTrack] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FitTrack] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FitTrack] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FitTrack] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FitTrack] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FitTrack] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FitTrack] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FitTrack] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FitTrack] SET  ENABLE_BROKER 
GO
ALTER DATABASE [FitTrack] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FitTrack] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FitTrack] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FitTrack] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FitTrack] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FitTrack] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FitTrack] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FitTrack] SET RECOVERY FULL 
GO
ALTER DATABASE [FitTrack] SET  MULTI_USER 
GO
ALTER DATABASE [FitTrack] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FitTrack] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FitTrack] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FitTrack] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FitTrack] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'FitTrack', N'ON'
GO
ALTER DATABASE [FitTrack] SET QUERY_STORE = OFF
GO
USE [FitTrack]
GO
/****** Object:  Table [dbo].[ActivityType]    Script Date: 27/04/2024 12:48:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ActivityType](
	[ActivityTypeID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ActivityTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FitnessActivity]    Script Date: 27/04/2024 12:48:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FitnessActivity](
	[FitnessActivityID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](100) NOT NULL,
	[Description] [text] NOT NULL,
	[ActivityDate] [date] NOT NULL,
	[ActivityTime] [time](7) NOT NULL,
	[DurationInMinutes] [int] NOT NULL,
	[UserID] [int] NULL,
	[ActivityTypeID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[FitnessActivityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GoalType]    Script Date: 27/04/2024 12:48:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GoalType](
	[GoalTypeID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[GoalTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 27/04/2024 12:48:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Password] [varchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserSettings]    Script Date: 27/04/2024 12:48:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserSettings](
	[UserID] [int] NOT NULL,
	[GoalTypeID] [int] NULL,
	[GoalValue] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ActivityType] ON 

INSERT [dbo].[ActivityType] ([ActivityTypeID], [Name]) VALUES (1, N'run')
INSERT [dbo].[ActivityType] ([ActivityTypeID], [Name]) VALUES (2, N'walk')
INSERT [dbo].[ActivityType] ([ActivityTypeID], [Name]) VALUES (3, N'hike')
INSERT [dbo].[ActivityType] ([ActivityTypeID], [Name]) VALUES (4, N'ride')
INSERT [dbo].[ActivityType] ([ActivityTypeID], [Name]) VALUES (5, N'swim')
INSERT [dbo].[ActivityType] ([ActivityTypeID], [Name]) VALUES (6, N'workout')
INSERT [dbo].[ActivityType] ([ActivityTypeID], [Name]) VALUES (7, N'HIIT')
INSERT [dbo].[ActivityType] ([ActivityTypeID], [Name]) VALUES (8, N'other')
SET IDENTITY_INSERT [dbo].[ActivityType] OFF
GO
SET IDENTITY_INSERT [dbo].[FitnessActivity] ON 

INSERT [dbo].[FitnessActivity] ([FitnessActivityID], [Title], [Description], [ActivityDate], [ActivityTime], [DurationInMinutes], [UserID], [ActivityTypeID]) VALUES (2003, N'Swimming pool', N'Day at swimming pool', CAST(N'2024-04-27' AS Date), CAST(N'11:10:00' AS Time), 30, 5, 5)
INSERT [dbo].[FitnessActivity] ([FitnessActivityID], [Title], [Description], [ActivityDate], [ActivityTime], [DurationInMinutes], [UserID], [ActivityTypeID]) VALUES (2004, N'Daily run', N'Running each day to prepare for marathon', CAST(N'2024-04-23' AS Date), CAST(N'14:20:00' AS Time), 30, 5, 1)
INSERT [dbo].[FitnessActivity] ([FitnessActivityID], [Title], [Description], [ActivityDate], [ActivityTime], [DurationInMinutes], [UserID], [ActivityTypeID]) VALUES (2005, N'Daily run', N'Day 1 prep for marathon', CAST(N'2024-04-25' AS Date), CAST(N'14:15:00' AS Time), 30, 1002, 1)
INSERT [dbo].[FitnessActivity] ([FitnessActivityID], [Title], [Description], [ActivityDate], [ActivityTime], [DurationInMinutes], [UserID], [ActivityTypeID]) VALUES (2006, N'Walk', N' After dinner', CAST(N'2024-04-25' AS Date), CAST(N'17:20:00' AS Time), 40, 1002, 2)
INSERT [dbo].[FitnessActivity] ([FitnessActivityID], [Title], [Description], [ActivityDate], [ActivityTime], [DurationInMinutes], [UserID], [ActivityTypeID]) VALUES (2007, N'Daily run', N'Day 2 prep for marathon', CAST(N'2024-04-26' AS Date), CAST(N'10:20:00' AS Time), 35, 1002, 1)
INSERT [dbo].[FitnessActivity] ([FitnessActivityID], [Title], [Description], [ActivityDate], [ActivityTime], [DurationInMinutes], [UserID], [ActivityTypeID]) VALUES (2008, N'Hiking', N'Went hiking today', CAST(N'2024-04-27' AS Date), CAST(N'10:20:00' AS Time), 150, 1002, 3)
SET IDENTITY_INSERT [dbo].[FitnessActivity] OFF
GO
SET IDENTITY_INSERT [dbo].[GoalType] ON 

INSERT [dbo].[GoalType] ([GoalTypeID], [Name]) VALUES (1, N'daily_activity_count')
INSERT [dbo].[GoalType] ([GoalTypeID], [Name]) VALUES (2, N'daily_activity_duration')
SET IDENTITY_INSERT [dbo].[GoalType] OFF
GO
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([UserID], [Username], [Password], [Email]) VALUES (5, N'admin', N'$2a$10$GQFohCPCDDLsW5TpP3QHm.cP5BfOxyxVHzECfjesh4tCtArgwB13u', N'admin@admin.com')
INSERT [dbo].[User] ([UserID], [Username], [Password], [Email]) VALUES (1002, N'user1', N'$2a$10$kDi/BkFzj.EvSokDVb.tPup54cyrFoDaDbpelbrLifNX.I7YDDLKK', N'user@user.com')
SET IDENTITY_INSERT [dbo].[User] OFF
GO
INSERT [dbo].[UserSettings] ([UserID], [GoalTypeID], [GoalValue]) VALUES (5, 2, 20)
INSERT [dbo].[UserSettings] ([UserID], [GoalTypeID], [GoalValue]) VALUES (1002, 2, 40)
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__User__536C85E4ADF5561C]    Script Date: 27/04/2024 12:48:15 ******/
ALTER TABLE [dbo].[User] ADD UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__User__A9D1053447EE4D84]    Script Date: 27/04/2024 12:48:15 ******/
ALTER TABLE [dbo].[User] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[FitnessActivity]  WITH CHECK ADD FOREIGN KEY([ActivityTypeID])
REFERENCES [dbo].[ActivityType] ([ActivityTypeID])
GO
ALTER TABLE [dbo].[FitnessActivity]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO
ALTER TABLE [dbo].[UserSettings]  WITH CHECK ADD FOREIGN KEY([GoalTypeID])
REFERENCES [dbo].[GoalType] ([GoalTypeID])
GO
ALTER TABLE [dbo].[UserSettings]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO
USE [master]
GO
ALTER DATABASE [FitTrack] SET  READ_WRITE 
GO
